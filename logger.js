import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';
const level = process.env.LOG_LEVEL || (isDev ? 'debug' : 'info');

export const logger = pino({
  level,
  ...(isDev && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  }),
});

/** Strip sensitive / bulky fields before logging request bodies */
export function sanitizeBody(body) {
  if (!body || typeof body !== 'object') return body;

  const out = { ...body };

  if (typeof out.message === 'string' && out.message.length > 120) {
    out.message = `${out.message.slice(0, 120)}… (${out.message.length} chars)`;
  }

  return out;
}
