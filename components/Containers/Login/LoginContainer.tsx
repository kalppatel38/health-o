"use client";

import { useEffect, useState, type FormEvent } from "react";
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
  fetchLoginUserSuccess,
} from "@/src/redux/slices/auth";
import {
  loginAPI,
  getLoginUser,
  otpVerificationAPI,
  resendOtpAPI,
} from "@/src/redux/services/auth.api";
import type { AppDispatch, RootState } from "@/src/redux/store";
import { ERRORS } from "@/src/libs/constants";
import { loginSchema } from "@/src/libs/validators";
import useLoginStatus from "@/src/libs/useLoginStatus";
import LoginScene from "./LoginScene";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { login, loginUser } = useSelector((state: RootState) => state.auth);
  const status = login.isLoading ? "loading" : login.error ? "error" : loginUser.isLogin ? "success" : "idle";
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Mirror svastha: useLoginStatus hook watches loginUser state and sets cookie
  useLoginStatus();

  const [showPassword, setShowPassword] = useState(false);

  // Local OTP flow state (mirroring behaviour from OtpContainer / svastha)
  const [isVerificationPage, setIsVerificationPage] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otpReference, setOtpReference] = useState<string | null>(null);
  const [resendSecondsLeft, setResendSecondsLeft] = useState(60);

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
        setOtp("");
        setOtpError(null);
        setResendSecondsLeft(60);
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

  // Countdown timer for enabling "Resend code"
  useEffect(() => {
    if (!isVerificationPage) {
      return;
    }

    if (resendSecondsLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isVerificationPage, resendSecondsLeft]);

  const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter the 6-digit one-time passcode.");
      setIsOtpLoading(false);
      return;
    }

    if (!otpReference) {
      setOtpError("Missing verification reference. Please start sign in again.");
      setIsOtpLoading(false);
      return;
    }

    setIsOtpLoading(true);
    try {
      if (!executeRecaptcha) {
        toast.error(ERRORS.recaptcha.notAvailabale);
        setOtpError(ERRORS.recaptcha.notAvailabale);
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
        setIsOtpLoading(false);

        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
        return;
      }

      setIsOtpLoading(false);
      setOtpError(ERRORS.auth.verificationCode);
      toast.error(ERRORS.auth.verificationCode);
    } catch (err: any) {
      setIsOtpLoading(false);
      const message = err?.message ?? ERRORS.auth.verificationCode;
      setOtpError(message);
      toast.error(message);
    }
  };

  const handleResendOtp = async () => {
    if (resendSecondsLeft > 0 || isOtpLoading) {
      return;
    }

    try {
      const userId = login.data?.user?.id;
      if (!userId || !otpReference) {
        toast.error("Missing information to resend the code. Please sign in again.");
        return;
      }

      setIsOtpLoading(true);

      const res = await resendOtpAPI({
        userId,
        otpReference,
      });

      if (res?.otpReference) {
        setOtpReference(String(res.otpReference));
        setOtp("");
        setOtpError(null);
        setResendSecondsLeft(60);
      }
    } catch (err: any) {
      const message =
        err?.message ?? "Unable to resend the code right now. Please try again.";
      toast.error(message);
    } finally {
      setIsOtpLoading(false);
    }
  };

  const isOtpSubmitDisabled = otp.trim().length !== 6 || isOtpLoading;

  return (
    <LoginScene
      control={control}
      showPassword={showPassword}
      status={status}
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={handleFormSubmit(onSubmit)}
      setIsShowPassword={setShowPassword}
      isVerificationPage={isVerificationPage}
      otp={otp}
      otpError={otpError}
      rememberMe={rememberMe}
      isOtpLoading={isOtpLoading}
      isOtpSubmitDisabled={isOtpSubmitDisabled}
      onOtpChange={setOtp}
      handleOtpSubmit={handleOtpSubmit}
      setRememberMe={setRememberMe}
      resendSecondsLeft={resendSecondsLeft}
      onResendOtp={handleResendOtp}
    />
  );
};

export default LoginContainer;