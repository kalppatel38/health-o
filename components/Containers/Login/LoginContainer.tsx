"use client";

import { useState } from "react";
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
} from "@/store/authSlice";
import { loginAPI, getLoginUser } from "@/src/redux/auth/api";
import type { AppDispatch, RootState } from "@/store/store";
import { ERRORS } from "@/lib/constants";
import { loginSchema } from "@/src/libs/validators";
import useLoginStatus from "@/src/libs/useLoginStatus";
import { LoginScene } from "./LoginScene";

interface LoginFormData {
  email: string;
  password: string;
}

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

      // If backend indicates OTP flow, redirect to OTP page like svastha.
      if (loginResponse.otpReference) {
        const search = new URLSearchParams({
          otpReference: String(loginResponse.otpReference),
        });
        if (loginResponse.user?.id) {
          search.set("userId", String(loginResponse.user.id));
        }
        router.push(`/otp?${search.toString()}`);
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
    />
  );
}

