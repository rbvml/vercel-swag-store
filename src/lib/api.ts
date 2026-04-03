const API_URL =
  process.env.API_URL || "https://vercel-swag-store-api.vercel.app/api";

export async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
  const json = await res.json();
  return json.data as T;
}
