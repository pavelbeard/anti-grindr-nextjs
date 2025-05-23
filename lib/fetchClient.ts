export async function client(url: string, options: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const endpoint = `${baseUrl}${url}`;
  const res = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    console.log(res.status, res.body);
    console.error(`Error by fetching url ${endpoint}:`, res.status);
  }

  return res.json();
}

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
