"use client";

import {
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  loginStarted,
  loginSuccess,
  loginFail,
  loginReset,
  fetchLoginUserSuccess,
} from "@/src/redux/slices/auth";
import {
  loginAPI,
  getLoginUser,
  otpVerificationAPI,
} from "@/src/redux/services/auth.api";
import type { AppDispatch, RootState } from "@/src/redux/store";
import { ERRORS } from "@/lib/constants";
import { loginSchema } from "@/src/libs/validators";
import useLoginStatus from "@/src/libs/useLoginStatus";
import { LoginScene } from "./LoginScene";

interface LoginFormData {
  email: string;
  password: string;
}

const DIGIT_COUNT = 6;

export function LoginContainer() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { login, loginUser } = useSelector((state: RootState) => state.auth);
  const status = login.isLoading ? "loading" : login.error ? "error" : loginUser.isLogin ? "success" : "idle";
  const error = login.error;
  const role = loginUser.data?.role || loginUser.data?.user?.userType || null;
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Mirror svastha: useLoginStatus hook watches loginUser state and sets cookie
  useLoginStatus();

  const [showPassword, setShowPassword] = useState(false);

  // Local OTP flow state (mirroring behaviour from OtpContainer / svastha)
  const [isVerificationPage, setIsVerificationPage] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otpReference, setOtpReference] = useState<string | null>(null);

  // Setup react-hook-form with yup validation (matching svastha pattern)
  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // Validate on blur like svastha
    reValidateMode: "onBlur", // Re-validate on blur
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(loginStarted());

    try {
      // Mirror svastha: obtain reCAPTCHA token and send it with login payload
      if (!executeRecaptcha) {
        toast.error(ERRORS.recaptcha.notAvailabale);
        dispatch(loginFail(ERRORS.recaptcha.notAvailabale));
        return;
      }

      const gReCaptchaToken = await executeRecaptcha("LoginFormSubmit");

      const loginResponse = await loginAPI({
        email: data.email,
        password: data.password,
        gReCaptchaToken,
      });

      // Store login response in Redux (matching svastha pattern)
      dispatch(loginSuccess(loginResponse));

      // If backend indicates OTP flow, switch to inline OTP screen (svastha-style)
      if (loginResponse.otpReference) {
        setIsVerificationPage(true);
        setOtpReference(String(loginResponse.otpReference));
        setDigits(Array(DIGIT_COUNT).fill(""));
        setOtpError(null);
        setOtpSubmitted(false);
        return;
      }

      // Fetch full user data (whoAmI) like svastha does
      if (loginResponse.session?.accessToken && loginResponse.user?.orgId) {
        try {
          const loginUserData = await getLoginUser({
            Authorization: `Bearer ${loginResponse.session.accessToken}`,
            org: loginResponse.user.orgId,
          });

          // Store full user data in Redux (matching svastha's fetchLoginUserSuccess)
          // useLoginStatus hook will automatically set the cookie (session cookie by default)
          dispatch(
            fetchLoginUserSuccess({
              ...loginUserData,
              rememberMe: false, // LoginContainer doesn't have rememberMe checkbox, default to session cookie
            })
          );
        } catch {
          // If whoAmI fails, continue with basic login response
        }
      }

      router.push("/dashboard");
    } catch (error: any) {
      // Mirror Svastha's behavior: surface the message coming from the API client / backend.
      const message =
        error?.message ?? "Unable to sign in. Please check your credentials.";

      toast.error(message);
      dispatch(loginFail(message));
    }
  };

  const isSubmitDisabled = isSubmitting || login.isLoading;

  // OTP handlers (lifted from OtpContainer so flow is inline here)
  const handleDigitChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.replace(/\D/g, "").slice(-1);

      setDigits((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });

      if (value && index < DIGIT_COUNT - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (otpError) {
        setOtpError(null);
      }
      if (otpSubmitted) {
        setOtpSubmitted(false);
      }
    };

  const handleKeyDown =
    (index: number) =>
    (event: KeyboardEvent<HTMLInputElement>) => {
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

    if (otpError) {
      setOtpError(null);
    }
    if (otpSubmitted) {
      setOtpSubmitted(false);
    }
  };

  const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otp = digits.join("");
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter the 6-digit one-time passcode.");
      setOtpSubmitted(false);
      setIsOtpLoading(false);
      return;
    }

    if (!otpReference) {
      setOtpError("Missing verification reference. Please start sign in again.");
      setOtpSubmitted(false);
      setIsOtpLoading(false);
      return;
    }

    setIsOtpLoading(true);
    try {
      if (!executeRecaptcha) {
        toast.error(ERRORS.recaptcha.notAvailabale);
        setOtpError(ERRORS.recaptcha.notAvailabale);
        setOtpSubmitted(false);
        setIsOtpLoading(false);
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
        try {
          const loginUserData = await getLoginUser({
            Authorization: `Bearer ${res.session.accessToken}`,
            org: res.user.orgId,
          });

          dispatch(
            fetchLoginUserSuccess({
              ...loginUserData,
              rememberMe,
            })
          );
        } catch {
          // ignore and continue to dashboard
        }

        setOtpError(null);
        setOtpSubmitted(true);
        setIsOtpLoading(false);

        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
        return;
      }

      setOtpSubmitted(false);
      setIsOtpLoading(false);
      setOtpError(ERRORS.auth.verificationCode);
      toast.error(ERRORS.auth.verificationCode);
    } catch (err: any) {
      setOtpSubmitted(false);
      setIsOtpLoading(false);
      const message = err?.message ?? ERRORS.auth.verificationCode;
      setOtpError(message);
      toast.error(message);
    }
  };

  const isOtpSubmitDisabled =
    digits.some((digit) => digit.trim().length === 0) || isOtpLoading;

  return (
    <LoginScene
      control={control}
      showPassword={showPassword}
      status={status}
      error={error}
      role={role}
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={handleFormSubmit(onSubmit)}
      setIsShowPassword={setShowPassword}
      formErrors={errors}
      isVerificationPage={isVerificationPage}
      digits={digits}
      otpError={otpError}
      otpSubmitted={otpSubmitted}
      rememberMe={rememberMe}
      isOtpLoading={isOtpLoading}
      isOtpSubmitDisabled={isOtpSubmitDisabled}
      handleDigitChange={handleDigitChange}
      handleKeyDown={handleKeyDown}
      handlePaste={handlePaste}
      handleOtpSubmit={handleOtpSubmit}
      setRememberMe={setRememberMe}
      inputRefs={inputRefs}
    />
  );
}