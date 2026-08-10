import type { IncomingMessage, ServerResponse } from 'node:http';
import { createServer } from '../app/src/server';

let serverPromise: ReturnType<typeof createServer> | undefined;

async function getServer() {
  serverPromise ??= createServer();
  return serverPromise;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
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
}
