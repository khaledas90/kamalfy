"use client";

import { motion } from "framer-motion";
import { UseFormWatch } from "react-hook-form";
import { slideUpVariants } from "@/utils/animations";
import { useTranslations } from "next-intl";

interface RegisterFormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  storeName?: string;
  subDomain?: string;
  logo?: FileList | null;
  plan?: "free" | "monthly" | "yearly";
  status?: string;
}

interface Step4ReviewProps {
  watch: UseFormWatch<RegisterFormData>;
  logoPreview: string | null;
  loading?: boolean;
  error?: string;
}

export function Step4Review({
  watch,
  logoPreview,
  loading = false,
  error,
}: Step4ReviewProps) {
  const t = useTranslations("common.pricing");
  const tReview = useTranslations("common.auth.register.review");

  const plans = [
    {
      id: "free" as const,
      name: t("free.name"),
    },
    {
      id: "monthly" as const,
      name: t("monthly.name"),
    },
    {
      id: "yearly" as const,
      name: t("yearly.name"),
    },
  ];

  const selectedPlan = plans.find((p) => p.id === watch("plan"));

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <motion.div variants={slideUpVariants}>
        <h3 className="text-xl font-bold text-foreground mb-2 text-center">
          {tReview("title")}
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {tReview("description")}
        </p>
      </motion.div>

      <div
        className={`space-y-4 bg-background/30 rounded-xl p-6 border border-border/50 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {tReview("fullName")}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {watch("name")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {tReview("email")}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {watch("email")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {tReview("phoneNumber")}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {watch("phoneNumber")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {tReview("storeName")}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {watch("storeName")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {tReview("subdomain")}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {watch("subDomain")}.kamalfy.com
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {tReview("plan")}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {selectedPlan?.name}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {tReview("status")}
            </p>
            <p className="text-sm font-semibold text-primary">
              {tReview("active")}
            </p>
          </div>
          {logoPreview && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {tReview("logo")}
              </p>
              <div className="w-16 h-16 border border-border rounded-lg overflow-hidden">
                <img
                  src={logoPreview}
                  alt={tReview("logo")}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
