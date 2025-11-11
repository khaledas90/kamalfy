"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  onPrevious: () => void;
  onNext?: () => void;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  loading,
  onPrevious,
  onNext,
}: FormNavigationProps) {
  const t = useTranslations("common.auth.register.navigation");

  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("previous")}
      </Button>

      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 gradient-bg text-white border-0 hover:opacity-90 transition-all font-semibold"
        >
          {t("next")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 gradient-bg text-white border-0 hover:opacity-90 transition-all font-semibold h-12 px-8"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("creating")}
            </>
          ) : (
            <>
              {t("createAccount")}
              <CheckCircle2 className="w-5 h-5" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}

