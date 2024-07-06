export const RemoveNullKeys = (params) => {
  let newParams = {};
  for (const key in params) {
    newParams[key] = params[key] ?? '';
  }
  return newParams;
};

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
  };
}