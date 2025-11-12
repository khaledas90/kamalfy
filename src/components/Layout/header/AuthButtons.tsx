"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { LayoutDashboard } from "lucide-react";

interface AuthButtonsProps {
  variant?: "desktop" | "mobile";
  onItemClick?: () => void;
}

export function AuthButtons({ variant = "desktop", onItemClick }: AuthButtonsProps) {
  const t = useTranslations("common.header");

  if (variant === "mobile") {
    return (
      <>
        <Link href="/login" onClick={onItemClick}>
          <Button
            size="sm"
            variant="ghost"
            className="w-full hover:bg-secondary"
          >
            {t("login") || "Login"}
          </Button>
        </Link>
        <Link href="/register" onClick={onItemClick}>
          <Button
            size="sm"
            className="w-full gradient-bg text-white border-0 hover:opacity-90"
          >
            {t("cta")}
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/login">
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-secondary"
        >
          {t("login") || "Login"}
        </Button>
      </Link>
      <Link href="/register">
        <Button
          size="sm"
          className="w-full gradient-bg text-white border-0 hover:opacity-90"
        >
          {t("cta")}
        </Button>
      </Link>
    </>
  );
}

