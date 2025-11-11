"use client";

import { motion } from "framer-motion";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Store, Globe, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { slideUpVariants } from "@/utils/animations";

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

interface Step2StoreSetupProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  watch: UseFormWatch<RegisterFormData>;
  logoPreview: string | null;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Step2StoreSetup({
  register,
  errors,
  watch,
  logoPreview,
  onLogoChange,
}: Step2StoreSetupProps) {
  const t = useTranslations("common.auth.register.storeSetup");

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <motion.div
        className="space-y-3"
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
      >
        <label
          htmlFor="storeName"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <Store className="w-5 h-5 text-primary" />
          {t("storeName.label")}
        </label>
        <Input
          id="storeName"
          {...register("storeName", {
            required: t("storeName.required"),
            minLength: {
              value: 2,
              message: t("storeName.minLength"),
            },
          })}
          type="text"
          placeholder={t("storeName.placeholder")}
          className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
            errors.storeName
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          }`}
        />
        {errors.storeName && (
          <p className="text-sm text-red-500">{errors.storeName.message}</p>
        )}
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
      >
        <label
          htmlFor="subDomain"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <Globe className="w-5 h-5 text-primary" />
          {t("subDomain.label")}
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="subDomain"
            {...register("subDomain", {
              required: t("subDomain.required"),
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: t("subDomain.invalid"),
              },
              minLength: {
                value: 3,
                message: t("subDomain.minLength"),
              },
            })}
            type="text"
            placeholder={t("subDomain.placeholder")}
            className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
              errors.subDomain
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }`}
          />
          <span className="text-muted-foreground text-lg whitespace-nowrap">
            .kamalfy.com
          </span>
        </div>
        {errors.subDomain && (
          <p className="text-sm text-red-500">{errors.subDomain.message}</p>
        )}
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
      >
        <label
          htmlFor="logo"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <ImageIcon className="w-5 h-5 text-primary" />
          {t("logo.label")}
        </label>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label
              htmlFor="logo"
              className="cursor-pointer flex-1 h-14 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center hover:border-primary transition-colors bg-background/50"
            >
              <span className="text-sm text-muted-foreground">
                {logoPreview ? t("logo.change") : t("logo.upload")}
              </span>
              <input
                id="logo"
                type="file"
                accept="image/*"
                {...register("logo")}
                className="hidden"
                onChange={onLogoChange}
              />
            </label>
          </div>
          {logoPreview && (
            <div className="relative w-32 h-32 border border-border rounded-lg overflow-hidden">
              <img
                src={logoPreview}
                alt={t("logo.preview")}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

