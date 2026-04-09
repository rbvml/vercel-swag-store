const API_URL = process.env.API_URL;
const API_BYPASS_TOKEN = process.env.API_BYPASS_TOKEN || "";

type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export async function api<T = unknown>(
  path: string,
  options: ApiOptions = {}
): Promise<{ data: T; response: Response }> {
  if (!API_URL) {
    throw new Error("Missing API_URL environment variable");
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(API_BYPASS_TOKEN
        ? { "x-vercel-protection-bypass": API_BYPASS_TOKEN }
        : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) throw new Error(`API error: ${response.status} ${path}`);
  const json = await response.json();
  return { data: json.data as T, response };
}
