const getFromCache = (key: string) =>
  JSON.parse(localStorage.getItem(key) || '{}');

const cache = (key: string, values: Record<string, unknown>) =>
  localStorage.setItem(
    key,
    JSON.stringify({ ...getFromCache(key), ...values })
  );

export const getSponsors = () => getFromCache('sponsors');
export const getSearch = () => getFromCache('search');

export const setCached = (values: Record<string, unknown>) =>
  cache('sponsors', values);

export const cacheSearch = (results: { [key: string]: string[] }) =>
  cache('search', results);
