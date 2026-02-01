import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/shared/axios";

export type ApiError = { status: number; message: string };

function handleAxiosError(err: unknown): never {
  console.log("handleAxiosError", err);

  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status ?? 0;
    const data = axiosErr.response?.data as { message: string };
    const message = data?.message || axiosErr.message || "Request error";
    throw { status, message } as ApiError;
  }
  throw { status: 0, message: String(err) } as ApiError;
}

export async function request<RequestType, ResponseType>(config: {
  url: string;
  method?: "get" | "post" | "put" | "delete";
  data?: RequestType;
}): Promise<ResponseType> {
  try {
    const res = await axiosInstance.request<ResponseType>({
      url: config.url,
      method: config.method || "get",
      data: config.data,
    });
    return res.data;
  } catch (err) {
    console.log("in request", err);
    handleAxiosError(err);
  }
}
