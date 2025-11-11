"use client";

import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { FieldError } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  icon: LucideIcon;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  register: any;
  validation?: any;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  suffix?: string;
}

export function FormInput({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  error,
  register,
  validation,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  suffix,
}: FormInputProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-foreground flex items-center gap-2"
      >
        <Icon className="w-5 h-5 text-primary" />
        {label}
      </label>
      <div className="relative flex items-center gap-2">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validation)}
          className={`h-14 text-base bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          } ${showPasswordToggle ? "pr-12" : ""}`}
        />
        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <Icon className="w-5 h-5" />
            ) : (
              <Icon className="w-5 h-5" />
            )}
          </button>
        )}
        {suffix && (
          <span className="text-muted-foreground text-lg whitespace-nowrap">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}

