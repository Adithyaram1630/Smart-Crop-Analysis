
export const API_BASE_URL = (() => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
  return url.endsWith("/api") ? url : `${url}/api`;
})();

export const getApiUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};
