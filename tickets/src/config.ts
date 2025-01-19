interface Config {
  baseUrl: string;
  apiVersion: string;
  jwtSigningKey: string | null;
  envName: string;
  mongoURI: string;
}

const config: Config = {
  apiVersion: process.env.API_VERSION || '/api/v0',
  baseUrl: process.env.BASE_URL || '/users',
  jwtSigningKey: process.env.JWT_KEY || null,
  envName: process.env.ENV_NAME || 'prod',
  mongoURI:
    process.env.MONGO_URI || 'mongodb://tickets-mongo-svc:27017/tickets',
};

if (!config.jwtSigningKey) {
  throw new Error('JWT_KEY must be defined');
}
if (!config.mongoURI) {
  throw new Error('MONGO_URI must be defined');
}

export const svcUrl = config.apiVersion.concat(config.baseUrl);
export const jwtSigningKey = config.jwtSigningKey;
export const isTestEnv: boolean = config.envName.toLowerCase() === 'test';
export const mongoURI = config.mongoURI;

// export default if you want to avoid import { config } from ...
export default config;
