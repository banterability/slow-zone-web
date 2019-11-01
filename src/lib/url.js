export const buildQueryString = (params = {}) => {
  const queryString = Object.entries(params).reduce((memo, [key, value]) => {
    memo.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    return memo;
  }, []);
  return queryString ? `?${queryString.join("&")}` : "";
};
