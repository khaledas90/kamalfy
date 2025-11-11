import { PaymentMethodTypes } from "@/enums/enums";
import { userApi } from ".";
import { QueryResponse } from "@/types/api";

export interface CompletePaymentRequest {
  SubscriptionId: string | null;
  TierId: string;
  UserId: string;
  AutoRenew: boolean;
  PaymentMethodId?: string;
  IsYearly: boolean;
  SavePaymentMethod: boolean;
  TransactionId: string;
  PaymentMethodType: PaymentMethodTypes;
  Last4Digits: string;
  ExpiryDate: string;
  HolderName: string;
  ProviderToken?: string | null;
  AmountPaid: number;
  Notes?: string;
}
interface ActiveSubscriptionResponse {
  $id: string;
  isYearly: boolean;
  subscriptionId: string;
  tierId: string | undefined;
}
interface IHasPaid {
  id: string;
  success: boolean;
  message: string | null;
  data: boolean;
}

const api = userApi.injectEndpoints({
  endpoints: (builder) => ({
    hasPaid: builder.query<IHasPaid, unknown>({
      query: ({ id }) => ({
        method: "GET",
        url: `/gym-subscription/users/${id}/has-paid-subscription`,
      }),
    }),
    hasActiveSubscription: builder.query<IHasPaid, { gymId: string }>({
      query: ({ gymId }) => ({
        method: "GET",
        url: `/gym-subscription/gyms/${gymId}/has-active-subscription`,
      }),
    }),
    completePayment: builder.mutation<unknown, CompletePaymentRequest>({
      query: (data) => ({
        method: "POST",
        url: "/gym-subscription/subscription/complete-payment",
        data,
      }),
    }),
    activeSubscription: builder.mutation<
      QueryResponse<ActiveSubscriptionResponse>,
      unknown
    >({
      query: ({ id }) => ({
        method: "GET",
        url: `/gym-subscription/gyms/${id}/active-subscription`,
      }),
    }),
  }),
});

export const {
  useHasPaidQuery,
  useHasActiveSubscriptionQuery,
  useCompletePaymentMutation,
  useActiveSubscriptionMutation,
} = api;
