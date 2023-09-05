import axios from 'axios';

// Config
export const ENTRY_ROUTE = '/sign-up';
export const TOKEN_PAYLOAD_KEY = 'authorization';
export const PROD_API = '';
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

const API_BASE_URL = getEnv();

const service = axios.create({
  baseURL: API_BASE_URL,
});

const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  const token = localStorage.getItem(TOKEN);
  const locale = localStorage.getItem('i18nextLng');
  if (token) {
    request.headers['authorization'] = `Bearer ${token}`;
  }
  request.headers['locale'] = locale;

  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  if (error.response) {
    return error.response;
  }
  return Promise.reject(error);
};

service.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error),
);
service.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
);

export default service;
