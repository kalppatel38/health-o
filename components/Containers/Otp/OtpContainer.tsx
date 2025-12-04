"use client";

import {
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { otpVerificationAPI, getLoginUser } from "@/src/redux/auth/api";
import { fetchLoginUserSuccess } from "@/store/authSlice";
import type { AppDispatch } from "@/store/store";
import { ERRORS } from "@/lib/constants";
import useLoginStatus from "@/src/libs/useLoginStatus";
import { OtpScene } from "./OtpScene";

const DIGIT_COUNT = 6;

export function OtpContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const otpReference = searchParams.get("otpReference");
  const userId = searchParams.get("userId");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mirror svastha: useLoginStatus hook watches loginUser state and sets cookie
  useLoginStatus();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otp = digits.join("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit one-time passcode.");
      setSubmitted(false);
      setIsLoading(false);
      return;
    }

    if (!otpReference) {
      setError("Missing verification reference. Please start sign in again.");
      setSubmitted(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      if (!executeRecaptcha) {
        toast.error(ERRORS.recaptcha.notAvailabale);
        setError(ERRORS.recaptcha.notAvailabale);
        setSubmitted(false);
        setIsLoading(false);
        return;
      }

      const gReCaptchaToken = await executeRecaptcha("LoginOTPFormSubmit");

      const res = await otpVerificationAPI({
        otp: Number(otp),
        otpReference,
        isOtpExtension: false,
        gReCaptchaToken,
      });

      if (res && res.user && res.session?.accessToken) {
        // Mirror svastha: hydrate login user and dispatch to Redux
        // The useLoginStatus hook will automatically set the cookie based on rememberMe preference
        try {
          const loginUser = await getLoginUser({
            Authorization: `Bearer ${res.session.accessToken}`,
            org: res.user.orgId,
          });

          // Dispatch to Redux with rememberMe preference
          // useLoginStatus hook will watch this and set cookie accordingly
          dispatch(
            fetchLoginUserSuccess({
              ...loginUser,
              rememberMe, // Pass rememberMe preference to Redux
            })
          );
        } catch {
          // ignore and continue to dashboard
        }

        setError(null);
        setSubmitted(true);
        setIsLoading(false);

        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
        return;
      }

      setSubmitted(false);
      setIsLoading(false);
      setError(ERRORS.auth.verificationCode);
      toast.error(ERRORS.auth.verificationCode);
    } catch (err: any) {
      setSubmitted(false);
      setIsLoading(false);
      // Mirror Svastha's error handling: extract e?.message from the thrown Error
      const message = err?.message ?? ERRORS.auth.verificationCode;
      setError(message);
      toast.error(message);
    }
  };

  const handleDigitChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.replace(/\D/g, "").slice(-1);

      setDigits((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });

      if (value && index < DIGIT_COUNT - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (error) {
        setError(null);
      }
      if (submitted) {
        setSubmitted(false);
      }
    };

  const handleKeyDown =
    (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace") {
        if (digits[index]) {
          setDigits((prev) => {
            const next = [...prev];
            next[index] = "";
            return next;
          });
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }

      if (event.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (event.key === "ArrowRight" && index < DIGIT_COUNT - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) {
      return;
    }

    const nextDigits = Array(DIGIT_COUNT)
      .fill("")
      .map((_, idx) => text[idx] ?? "");
    setDigits(nextDigits);

    const filledCount = nextDigits.findIndex((digit) => digit === "");
    const focusIndex = filledCount === -1 ? DIGIT_COUNT - 1 : filledCount;
    inputRefs.current[focusIndex]?.focus();

    if (error) {
      setError(null);
    }
    if (submitted) {
      setSubmitted(false);
    }
  };

  const isSubmitDisabled = digits.some((digit) => digit.trim().length === 0) || isLoading;

  return (
    <OtpScene
      digits={digits}
      error={error}
      submitted={submitted}
      rememberMe={rememberMe}
      isLoading={isLoading}
      isSubmitDisabled={isSubmitDisabled}
      handleDigitChange={handleDigitChange}
      handleKeyDown={handleKeyDown}
      handlePaste={handlePaste}
      handleSubmit={handleSubmit}
      setRememberMe={setRememberMe}
      inputRefs={inputRefs}
    />
  );
}

