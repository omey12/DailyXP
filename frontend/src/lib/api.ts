export const getApiUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.trim() ?? "";

  if (!baseUrl) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  const normalizedBase = baseUrl.replace(/\/+$|\s+$/g, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
};