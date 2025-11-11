"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Sparkles, User, Store, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { useRegister } from "@/store/queries";
import {
  cardVariants,
  containerVariants,
  slideUpVariants,
} from "@/utils/animations";
import { ProgressSteps } from "./ProgressSteps";
import { Step1PersonalInfo } from "./steps/Step1PersonalInfo";
import { Step2StoreSetup } from "./steps/Step2StoreSetup";
import { Step3PlanSelection } from "./steps/Step3PlanSelection";
import { Step4Review } from "./steps/Step4Review";
import { FormNavigation } from "./FormNavigation";
import { RegisterFormBackground } from "./RegisterFormBackground";

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

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("common.auth.register");
  const { toast } = useToast();
  const registerMutation = useRegister();

  const steps = [
    { id: 1, title: t("steps.personalInfo"), icon: User },
    { id: 2, title: t("steps.storeSetup"), icon: Store },
    { id: 3, title: t("steps.choosePlan"), icon: CheckCircle2 },
    { id: 4, title: t("steps.review"), icon: CheckCircle2 },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormData>({
    defaultValues: {
      plan: "monthly",
      status: "active",
    },
  });

  const watchedLogo = watch("logo");

  useEffect(() => {
    if (watchedLogo && watchedLogo.length > 0) {
      const file = watchedLogo[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedLogo]);

  const validateStep = async (step: number): Promise<boolean> => {
    let fields: (keyof RegisterFormData)[] = [];

    switch (step) {
      case 1:
        fields = [
          "name",
          "email",
          "phoneNumber",
          "password",
          "confirmPassword",
        ];
        break;
      case 2:
        fields = ["storeName", "subDomain"];
        break;
      case 3:
        fields = ["plan"];
        break;
      default:
        return true;
    }

    const result = await trigger(fields);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setError("");
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register("logo").onChange(e);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setError("");

    if (data.password !== data.confirmPassword) {
      setError(t("passwordMismatch"));
      toast({
        variant: "destructive",
        title: t("passwordMismatch"),
        description: t("passwordMismatch"),
      });
      return;
    }

    if (!data.storeName || !data.subDomain || !data.plan) {
      setError(t("validation.required"));
      toast({
        variant: "destructive",
        title: t("validation.error"),
        description: t("validation.required"),
      });
      return;
    }

    const logoFile =
      data.logo && data.logo.length > 0 ? data.logo[0] : undefined;

    registerMutation.mutate(
      {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        storeName: data.storeName,
        subDomain: data.subDomain,
        logo: logoFile,
        plan: data.plan,
        status: data.status || "active",
      },
      {
        onSuccess: (response) => {
          toast({
            title: t("success.title"),
            description: response.message || t("success.description"),
            variant: "default",
          });
        },
        onError: (error: any) => {
          let errorMessage = t("error.default");

          if (error?.response?.data) {
            const errorData = error.response.data;
            if (typeof errorData === "string") {
              errorMessage = errorData;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.error) {
              errorMessage = errorData.error;
            }
          } else if (error?.message) {
            errorMessage = error.message;
          }

          setError(errorMessage);
          toast({
            variant: "destructive",
            title: t("error.title"),
            description: errorMessage,
            duration: 5000,
          });
        },
      }
    );
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden">
      <RegisterFormBackground />

      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden"
          variants={cardVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          <motion.div
            className="absolute top-6 right-6"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-6 h-6 text-primary/30" />
          </motion.div>

          <CardHeader className="space-y-6 pb-8 px-8 pt-10 relative z-10">
            <motion.div variants={slideUpVariants}>
              <CardTitle className="text-4xl font-bold text-center gradient-text">
                {t("title")}
              </CardTitle>
            </motion.div>
            <motion.div variants={slideUpVariants}>
              <CardDescription className="text-center text-lg text-muted-foreground">
                {t("description")}
              </CardDescription>
            </motion.div>

            <ProgressSteps steps={steps} currentStep={currentStep} />
          </CardHeader>

          <CardContent className="space-y-6 pb-10 px-8 relative z-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1PersonalInfo
                    register={register}
                    errors={errors}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    onToggleConfirmPassword={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    watch={watch}
                  />
                )}

                {currentStep === 2 && (
                  <Step2StoreSetup
                    register={register}
                    errors={errors}
                    watch={watch}
                    logoPreview={logoPreview}
                    onLogoChange={handleLogoChange}
                  />
                )}

                {currentStep === 3 && (
                  <Step3PlanSelection
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                )}

                {currentStep === 4 && (
                  <Step4Review
                    watch={watch}
                    logoPreview={logoPreview}
                    loading={registerMutation.isPending}
                    error={error}
                  />
                )}
              </AnimatePresence>

              <FormNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                loading={registerMutation.isPending}
                onPrevious={prevStep}
                onNext={nextStep}
              />
            </form>

            <motion.div className="text-center pt-4" variants={slideUpVariants}>
              <p className="text-sm text-muted-foreground">
                {t("hasAccount")}{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  {t("signIn")}
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </motion.div>
      </motion.div>
    </div>
  );
}
