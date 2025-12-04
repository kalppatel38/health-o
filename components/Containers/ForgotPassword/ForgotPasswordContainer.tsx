"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";

import { forgotPasswordAPI } from "@/src/redux/services/auth.api";
import { ERRORS } from "@/lib/constants";
import { ForgotPasswordScene } from "./ForgotPasswordScene";

export function ForgotPasswordContainer() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!executeRecaptcha) {
        toast.error(ERRORS.recaptcha.notAvailabale);
        setError(ERRORS.recaptcha.notAvailabale);
        setSubmitted(false);
        return;
      }

      const gReCaptchaToken = await executeRecaptcha("ForgotPasswordFormSubmit");

      await forgotPasswordAPI({ email, gReCaptchaToken });
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (submitted) setSubmitted(false);
    if (error) setError(null);
  };

  const isSubmitDisabled = email.trim().length === 0;

  return (
    <ForgotPasswordScene
      email={email}
      submitted={submitted}
      error={error}
      isSubmitDisabled={isSubmitDisabled}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

