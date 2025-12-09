"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { forgotPasswordAPI } from "@/src/redux/services/auth.api";
import { ERRORS } from "@/src/libs/constants";
import { ForgotPasswordFormInputs, ForgotPasswordFormValidateSchema } from "@/src/schemas/forgotPasswordSchema";
import { ForgotPasswordScene } from "./ForgotPasswordScene";

const ForgotPasswordContainer = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Setup react-hook-form with yup validation
  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(ForgotPasswordFormValidateSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur", // Validate on blur
    reValidateMode: "onBlur", // Re-validate on blur
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      if (!executeRecaptcha) {
        toast.error(ERRORS.recaptcha.notAvailabale);
        setError(ERRORS.recaptcha.notAvailabale);
        setSubmitted(false);
        return;
      }

      const gReCaptchaToken = await executeRecaptcha("ForgotPasswordFormSubmit");

      await forgotPasswordAPI({ email: data.email, gReCaptchaToken });
      setError(null);
      setSubmitted(true);
      toast.success(
        "If an account exists for this email, you'll receive a reset link shortly.",
      );
    } catch (err: any) {
      setSubmitted(false);
      // Mirror Svastha's error handling: extract e?.message from the thrown Error
      const message =
        err?.message ?? "Unable to process your request right now. Please try again later.";
      setError(message);
      toast.error(message);
    }
  };

  const isSubmitDisabled = isSubmitting;

  return (
    <ForgotPasswordScene
      control={control}
      submitted={submitted}
      error={error}
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={handleFormSubmit(onSubmit)}
    />
  );
};

export { ForgotPasswordContainer };

