interface Config {
  baseUrl: string;
  apiVersion: string;
}

const config: Config = {
  apiVersion: process.env.API_VERSION || '/api/v0',
  baseUrl: process.env.BASE_URL || '/users',
};

export const svcUrl = config.apiVersion.concat(config.baseUrl);

// export default if you want to avoid import { config } from ...
export default config;
