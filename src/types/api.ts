export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>;
