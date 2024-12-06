interface Config {
  baseUrl: string;
  apiVersion: string;
  jwtSigningKey: string | null;
}

const config: Config = {
  apiVersion: process.env.API_VERSION || '/api/v0',
  baseUrl: process.env.BASE_URL || '/users',
  jwtSigningKey: process.env.JWT_KEY || null,
};

if (!config.jwtSigningKey) {
  throw new Error('JWT_KEY must be defined');
}

export const svcUrl = config.apiVersion.concat(config.baseUrl);
export const jwtSigningKey = config.jwtSigningKey;

// export default if you want to avoid import { config } from ...
export default config;
