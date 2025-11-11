"use client";

import React from "react";
import { Button } from "../ui/button";
import { invalidateAllQueries } from "@/store/api";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function BtnGoBack() {
  const t = useTranslations("Dashboard.NoPermission");

  const handleClick = async () => {
    await invalidateAllQueries();
  };

  return (
    <div>
      <Button>
        <ArrowLeft className="me-2 h-4 w-4" />
        <Link href="/dashboard" onClick={handleClick}>
          {t("Back to Home")}
        </Link>
      </Button>
    </div>
  );
}
