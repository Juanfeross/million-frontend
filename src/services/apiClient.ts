import type { ApiResponse, QueryParams } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

const buildUrl = (path: string, params?: QueryParams) => {
  const url = new URL(path.startsWith("http") ? path : `${API_BASE_URL}${path}`);

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    if (queryString) {
      url.search = queryString;
    }
  }

  return url.toString();
};

async function request<T>(path: string, options?: RequestInit, params?: QueryParams): Promise<T> {
  const url = buildUrl(path, params);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const payload: ApiResponse<T> = await response.json().catch(() => {
    throw new Error("No fue posible leer la respuesta del servidor");
  });

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Ocurrió un error inesperado");
  }

  return payload.data;
}

export const apiClient = {
  get: <T>(path: string, params?: QueryParams) => request<T>(path, { method: "GET" }, params),
};
