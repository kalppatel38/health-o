"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";

import { resetPasswordAPI } from "@/src/redux/auth/api";
import { ERRORS } from "@/lib/constants";
import { ResetPasswordScene } from "./ResetPasswordScene";

export function ResetPasswordContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.password.trim().length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
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

      const gReCaptchaToken = await executeRecaptcha("ForgotPasswordFormSubmit");

      await resetPasswordAPI({
        newPassword: form.password,
        confirmPassword: form.password,
        invitationToken: token,
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) {
      setError(null);
    }
    if (submitted) {
      setSubmitted(false);
    }
  };

  const isSubmitDisabled =
    form.password.trim().length === 0 || form.confirmPassword.trim().length === 0;

  return (
    <ResetPasswordScene
      form={form}
      submitted={submitted}
      error={error}
      isSubmitDisabled={isSubmitDisabled}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      token={token}
    />
  );
}

