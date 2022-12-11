export const getCached = () =>
  JSON.parse(localStorage.getItem("store") || "{}");
export const setCached = (values: Record<string, unknown>) =>
  localStorage.setItem("store", JSON.stringify({ ...getCached(), ...values }));

export const getCachedSearch = () =>
  JSON.parse(localStorage.getItem("search") || "{}");
export const cacheSearch = (results: { [key: string]: string[] }) =>
  localStorage.setItem(
    "search",
    JSON.stringify({ ...getCachedSearch(), ...results })
  );
