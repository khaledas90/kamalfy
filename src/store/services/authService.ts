import { mainApi } from "../api";

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  storeName?: string;
  subDomain?: string;
  logo?: string;
  plan?: "free" | "monthly" | "yearly";
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  storeName: string;
  subDomain: string;
  logo?: File;
  plan: "free" | "monthly" | "yearly";
  status?: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  message?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const authService = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await mainApi.post<LoginResponse>(`/auth/login`, payload);
    return data;
  },

  register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("phoneNumber", payload.phoneNumber);
    formData.append("password", payload.password);
    formData.append("storeName", payload.storeName);
    formData.append("subDomain", payload.subDomain);
    formData.append("plan", payload.plan);
    if (payload.logo) {
      formData.append("logo", payload.logo);
    }
    if (payload.status) {
      formData.append("status", payload.status);
    }

    const { data } = await mainApi.post<RegisterResponse>(
      `/merchant-auth/signup`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  forgotPassword: async (
    payload: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const { data } = await mainApi.post<ForgotPasswordResponse>(
      `/auth/forgot-password`,
      payload
    );
    return data;
  },

  resetPassword: async (
    payload: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const { data } = await mainApi.post<ResetPasswordResponse>(
      `/auth/reset-password`,
      payload
    );
    return data;
  },

  logout: async (): Promise<{ message: string }> => {
    const { data } = await mainApi.post(`/auth/logout`);
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await mainApi.get<User>(`/auth/me`);
    return data;
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const { data } = await mainApi.post<LoginResponse>(`/auth/refresh`, {
      refreshToken,
    });
    return data;
  },
};
