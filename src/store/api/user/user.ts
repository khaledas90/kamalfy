import { LoginResponse, QueryResponse, RegisterResponse } from "@/types/api";
import { userApi } from ".";
import store from "@/store/store";

export interface Profile {
  id: number;
  name: string;
  email: string;
  country_id: number;
  role: "admin" | "superadmin";
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

export type ScreenName =
  | "Branches"
  | "Members"
  | "Billing"
  | "Invoices"
  | "Trainers"
  | "WorkoutPlans"
  | "Marketing"
  | "Settings_RolePermissions_Roles"
  | "Settings_RolePermissions_Users"
  | "Settings_RolePermissions_Permissions"
  | "Settings_GymSettings"
  | "Settings_Notification"
  | "DietPlans"
  | "MembershipPlans"
  | "MarketPlace"
  | "Subscriptions"
  | "Inventory"
  | "Inventory_Suppliers"
  | "Inventory_Products"
  | "Inventory_Sales"
  | "Inventory_Categories"
  | "TrainerSchedule"
  | "Trainers"
  | "AnalyticsReporting";

export interface ScreenPermission {
  canAdd: boolean;
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export type Screens = {
  [key in ScreenName]: ScreenPermission;
};

export interface Permission {
  userId: string;
  gymId: string;
  screens: Screens;
}

const api = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (data) => ({
          method: "POST",
          url: "/auth/login",
          data,
        }),
        onCacheEntryAdded: () => {
          store.dispatch(userApi.util.resetApiState());
        },
      }
    ),
    registerUser: builder.mutation<QueryResponse<RegisterResponse>, unknown>({
      query: (data) => ({
        method: "POST",
        url: "/users/register-tenant",
        data,
      }),
    }),
    logout: builder.mutation<void, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: "/auth/logout",
        method: "POST",
        headers: {
          "X-Refresh-Token": refreshToken,
        },
      }),
    }),
    getProfile: builder.query<void, void>({
      query: () => ({
        method: "GET",
        url: "/show",
      }),
      providesTags: [{ type: "Profile", id: "ME" }],
    }),
    updateProfile: builder.mutation<undefined, unknown>({
      query: (data) => ({ url: "/update", method: "POST", data }),
    }),
    ScreensPermissions: builder.query<
      QueryResponse<Permission>,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/users/${userId}/screens-permissions`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useScreensPermissionsQuery,
} = api;
