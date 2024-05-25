// Config
export const ENTRY_ROUTE = '/sign-up';
export const TOKEN_PAYLOAD_KEY = 'authorization';
// eslint-disable-next-line no-undef
export const PROD_API = process.env.REACT_APP_PROD_BASE_API;
// eslint-disable-next-line no-undef
export const DEV_API = process.env.REACT_APP_DEV_BASE_API;
// eslint-disable-next-line no-undef
export const LOCALEAPI = process.env.REACT_APP_DEV_BASE_API;
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
