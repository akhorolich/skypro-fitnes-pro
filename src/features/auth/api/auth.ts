import { request } from "@/shared/api/client";
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";

export const authApi = {
  login: (payload: LoginRequest) =>
    request<typeof payload, LoginResponse>({
      url: "/auth/login",
      method: "post",
      data: payload,
    }),

  register: (payload: RegisterRequest) =>
    request<typeof payload, RegisterResponse>({
      url: "/auth/register",
      method: "post",
      data: payload,
    }),

  me: () => request<null, MeResponse>({ url: "/users/me", method: "get" }),
};
