"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { resetPasswordAPI } from "@/src/redux/services/auth.api";
import { ERRORS } from "@/src/libs/constants";
import { ResetPasswordFormInputs, ResetPasswordFormValidateSchema } from "@/src/schemas/resetPasswordSchema";
import ResetPasswordScene from "./ResetPasswordScene";

const ResetPasswordContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Setup react-hook-form with yup validation
  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(ResetPasswordFormValidateSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      invitationToken: token || "",
    },
    mode: "onBlur", // Validate on blur
    reValidateMode: "onBlur", // Re-validate on blur
  });

  // Update invitationToken when token changes
  useEffect(() => {
    if (token) {
      setValue("invitationToken", token);
    }
  }, [token, setValue]);

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    if (!data.invitationToken) {
      const message = ERRORS.auth.emailToken;
      setError(message);
      toast.error(message);
      return;
    }

    try {
      if (!executeRecaptcha) {
        toast.error(ERRORS.recaptcha.notAvailabale);
        setError(ERRORS.recaptcha.notAvailabale);
        setSubmitted(false);
        return;
      }

      const gReCaptchaToken = await executeRecaptcha("ResetPasswordFormSubmit");

      await resetPasswordAPI({
        newPassword: data.newPassword,
        confirmPassword: data.newPassword,
        invitationToken: data.invitationToken,
        gReCaptchaToken,
      });

      setError(null);
      setSubmitted(true);
      toast.success("Your password has been updated. Redirecting you to sign in...");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      setSubmitted(false);
      // Mirror Svastha's error handling: extract e?.message from the thrown Error
      const message =
        err?.message ?? "We couldn't update your password. Your reset link may have expired.";
      setError(message);
      toast.error(message);
    }
  };

  const isSubmitDisabled = isSubmitting;

  return (
    <ResetPasswordScene
      control={control}
      submitted={submitted}
      error={error}
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={handleFormSubmit(onSubmit)}
      token={token}
    />
  );
};

export default ResetPasswordContainer;

