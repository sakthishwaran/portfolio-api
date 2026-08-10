import type { IncomingMessage, ServerResponse } from 'node:http';
import { createServer } from '../app/src/server';

let serverPromise: ReturnType<typeof createServer> | undefined;

async function getServer() {
  if (!serverPromise) {
    serverPromise = (async () => {
      const server = await createServer();
      await server.initialize();
      return server;
    })();
  }
  return serverPromise;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const server = await getServer();

    const response = await server.inject({
      method: req.method ?? 'GET',
      url: req.url ?? '/',
      headers: req.headers as Record<string, string>,
      payload:
        req.method === 'GET' || req.method === 'HEAD'
          ? undefined
          : req,
      validate: false,
    });

    res.statusCode = response.statusCode;

    for (const [key, value] of Object.entries(response.headers)) {
      if (value !== undefined) {
        res.setHeader(key, String(value));
      }
    }

    res.end(response.rawPayload);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Vercel Serverless Handler Failure:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(
      JSON.stringify({
        statusCode: 500,
        error: 'Internal Server Error',
        message,
      }),
    );
  }
}
