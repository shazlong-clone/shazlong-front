export const PROD_API = '';
export const DEV_API = '127.0.0.1:3000';
export const LOCALEAPI = '127.0.0.1:3000';
export const TOKEN = 'token';

const getEnv = () => {
  // eslint-disable-next-line no-undef
  switch (process.env.NODE_ENV) {
    case 'development':
      return DEV_API;
    case 'production':
      return PROD_API;
    case 'local':
      return LOCALEAPI;
    default:
      return DEV_API;
  }
};

export const API_BASE_URL = getEnv();
