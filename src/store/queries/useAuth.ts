"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next/client";
import {
  authService,
  User,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../services";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: authKeys.user(),
    queryFn: async () => {
      return await authService.getCurrentUser();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),
    onSuccess: (data, variables) => {
      setCookie("token", data.token, {
        maxAge: variables.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
        path: "/",
      });

      if (data.refreshToken) {
        setCookie("refreshToken", data.refreshToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
        });
      }
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterRequest) => authService.register(payload),
    onSuccess: (data) => {
      setCookie("token", data.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) =>
      authService.forgotPassword(payload),
    onSuccess: () => {},
    onError: (error: any) => {
      console.error("Forgot password error:", error);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) =>
      authService.resetPassword(payload),
    onSuccess: () => {},
    onError: (error: any) => {
      console.error("Reset password error:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      deleteCookie("token");
      deleteCookie("refreshToken");
      queryClient.clear();
      router.push("/login");
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      deleteCookie("token");
      deleteCookie("refreshToken");
      queryClient.clear();
      router.push("/login");
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: string) =>
      authService.refreshToken(refreshToken),
    onSuccess: (data) => {
      setCookie("token", data.token, {
        maxAge: 24 * 60 * 60, // 1 day
        path: "/",
      });

      if (data.refreshToken) {
        setCookie("refreshToken", data.refreshToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
        });
      }
      queryClient.setQueryData(authKeys.user(), data.user);
    },
    onError: (error: any) => {
      console.error("Refresh token error:", error);
      deleteCookie("token");
      deleteCookie("refreshToken");
      queryClient.clear();
    },
  });
};
