"use client";

import { motion } from "framer-motion";
import { User, Store, CheckCircle2, Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: typeof User;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <motion.div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  isActive
                    ? "border-primary bg-primary text-white scale-110"
                    : isCompleted
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background/50 text-muted-foreground"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <StepIcon className="w-5 h-5" />
                )}
              </motion.div>
              <p
                className={`text-xs mt-2 font-medium text-center ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep > step.id ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

