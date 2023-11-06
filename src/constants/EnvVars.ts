/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Port: (process.env.PORT ?? 0),
  CookieProps: {
    Key: 'ExpressNodeApp',
    Secret: (process.env.COOKIE_SECRET ?? ''),
  },
  Database: {
    Url: (process.env.DB_URL ??  ''),
  },
} as const;
