"use client";

import { motion } from "framer-motion";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface Step1PersonalInfoProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  watch: (name: keyof RegisterFormData) => any;
}

export function Step1PersonalInfo({
  register,
  errors,
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  watch,
}: Step1PersonalInfoProps) {
  const t = useTranslations("common.auth.register.personalInfo");

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <motion.div className="space-y-3" variants={slideUpVariants}>
        <label
          htmlFor="name"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <User className="w-5 h-5 text-primary" />
          {t("name.label")}
        </label>
        <Input
          id="name"
          {...register("name", {
            required: t("name.required"),
            minLength: {
              value: 2,
              message: t("name.minLength"),
            },
          })}
          type="text"
          placeholder={t("name.placeholder")}
          className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </motion.div>

      <motion.div className="space-y-3" variants={slideUpVariants}>
        <label
          htmlFor="email"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <Mail className="w-5 h-5 text-primary" />
          {t("email.label")}
        </label>
        <Input
          id="email"
          {...register("email", {
            required: t("email.required"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("email.invalid"),
            },
          })}
          type="email"
          placeholder={t("email.placeholder")}
          className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </motion.div>

      <motion.div className="space-y-3" variants={slideUpVariants}>
        <label
          htmlFor="phoneNumber"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <Phone className="w-5 h-5 text-primary" />
          {t("phone.label")}
        </label>
        <Input
          id="phoneNumber"
          {...register("phoneNumber", {
            required: t("phone.required"),
            pattern: {
              value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
              message: t("phone.invalid"),
            },
          })}
          type="tel"
          placeholder={t("phone.placeholder")}
          className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
            errors.phoneNumber
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          }`}
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </motion.div>

      <motion.div className="space-y-3" variants={slideUpVariants}>
        <label
          htmlFor="password"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <Lock className="w-5 h-5 text-primary" />
          {t("password.label")}
        </label>
        <div className="relative">
          <Input
            id="password"
            {...register("password", {
              required: t("password.required"),
              minLength: {
                value: 8,
                message: t("password.minLength"),
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder={t("password.placeholder")}
            className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pr-12 ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </motion.div>

      <motion.div className="space-y-3" variants={slideUpVariants}>
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <Lock className="w-5 h-5 text-primary" />
          {t("confirmPassword.label")}
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            {...register("confirmPassword", {
              required: t("confirmPassword.required"),
              validate: (value) =>
                value === watch("password") || t("confirmPassword.mismatch"),
            })}
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t("confirmPassword.placeholder")}
            className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pr-12 ${
              errors.confirmPassword
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
            onClick={onToggleConfirmPassword}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

