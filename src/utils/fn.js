export const RemoveNullKeys = (params) => {
    let newParams = {};
    for (const key in params) {
      newParams[key] = params[key] ?? '';
    }
    return newParams;
  };