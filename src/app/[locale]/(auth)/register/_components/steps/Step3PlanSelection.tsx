"use client";

import { motion } from "framer-motion";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Check } from "lucide-react";
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

interface Plan {
  id: "free" | "basic" | "yearly";
  name: string;
  price: string;
  period: string;
  description: string;
  highlighted: boolean;
}

interface Step3PlanSelectionProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  watch: UseFormWatch<RegisterFormData>;
}

export function Step3PlanSelection({
  register,
  errors,
  watch,
}: Step3PlanSelectionProps) {
  const t = useTranslations("common.pricing");
  const tAuth = useTranslations("common.auth.register.planSelection");

  const plans: Plan[] = [
    {
      id: "free",
      name: t("free.name"),
      price: t("free.price"),
      period: t("free.period"),
      description: t("free.description"),
      highlighted: false,
    },
    {
      id: "basic",
      name: t("monthly.name"),
      price: t("monthly.price"),
      period: t("monthly.period"),
      description: t("monthly.description"),
      highlighted: true,
    },
    {
      id: "yearly",
      name: t("yearly.name"),
      price: t("yearly.price"),
      period: t("yearly.period"),
      description: t("yearly.description"),
      highlighted: false,
    },
  ];

  const watchedPlan = watch("plan");

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <motion.div variants={slideUpVariants}>
        <h3 className="text-xl font-bold text-foreground mb-2 text-center">
          {tAuth("title")}
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {tAuth("description")}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isSelected = watchedPlan === plan.id;
          return (
            <motion.label
              key={plan.id}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg scale-105"
                  : "border-border/50 bg-background/50 hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="radio"
                value={plan.id}
                {...register("plan", {
                  required: tAuth("required"),
                })}
                className="hidden"
              />
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {tAuth("mostPopular")}
                  </span>
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {plan.name}
                </h4>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {plan.description}
                </p>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.label>
          );
        })}
      </div>
      {errors.plan && (
        <p className="text-sm text-red-500 text-center">
          {errors.plan.message}
        </p>
      )}
    </motion.div>
  );
}
