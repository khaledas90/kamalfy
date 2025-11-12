"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useLogin } from "@/store/queries/useAuth";
import { useToast } from "@/components/ui/use-toast";
import {
  cardVariants,
  containerVariants,
  slideUpVariants,
} from "@/utils/animations";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export default function LoginForm() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("common.auth.login");
  const { toast } = useToast();
  const { mutate: loginMutation, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    setError("");

    loginMutation(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
      {
        onSuccess: () => {
          toast({
            title: t("success.title") || "Login Successful!",
            description:
              t("success.description") ||
              "You have successfully logged in. Redirecting...",
            variant: "default",
            duration: 3000,
          });
        },
        onError: (error: any) => {
          let errorMessage =
            t("error.default") ||
            "An error occurred during login. Please try again.";

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
            title: t("error.title") || "Login Failed",
            description: errorMessage,
            duration: 5000,
          });
        },
      }
    );
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />

        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-lg"
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

          <CardHeader className="space-y-4 pb-8 px-8 pt-10 relative z-10">
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
          </CardHeader>

          <CardContent className="space-y-6 pb-10 px-8 relative z-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert
                  variant="destructive"
                  className="border-red-500/50 bg-red-500/10"
                >
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div className="space-y-3" variants={slideUpVariants}>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  {t("email.label")}
                </label>
                <div className="relative">
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
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div className="space-y-3" variants={slideUpVariants}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-foreground flex items-center gap-2"
                  >
                    <Lock className="w-5 h-5 text-primary" />
                    {t("password.label")}
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {t("password.forgot")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    {...register("password", {
                      required: t("password.required"),
                      minLength: {
                        value: 6,
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
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? t("password.hide") : t("password.show")
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                className="flex items-center space-x-2"
                variants={slideUpVariants}
              >
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  {t("rememberMe")}
                </label>
              </motion.div>

              <motion.div variants={slideUpVariants} className="pt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-14 gradient-bg text-white border-0 hover:opacity-90 transition-all font-semibold text-lg shadow-lg shadow-primary/25"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    t("submit")
                  )}
                </Button>
              </motion.div>

              <motion.div
                className="text-center pt-4"
                variants={slideUpVariants}
              >
                <p className="text-sm text-muted-foreground">
                  {t("noAccount")}{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    {t("signUp")}
                  </Link>
                </p>
              </motion.div>
            </form>
          </CardContent>
        </motion.div>
      </motion.div>
    </div>
  );
}
