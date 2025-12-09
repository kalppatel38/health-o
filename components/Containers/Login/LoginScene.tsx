"use client";

import type { FormEvent } from "react";
import { Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputFieldOnly,
  PasswordField,
} from "@/src/component/FormFields/FormFieldsComponent";
import OtpInput from "react-otp-input";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginSceneProps {
  control: Control<LoginFormData>;
  showPassword: boolean;
  status: "idle" | "loading" | "success" | "error";
  isSubmitDisabled: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  setIsShowPassword: (show: boolean) => void;

  // OTP-related props for inline verification flow
  isVerificationPage: boolean;
  otp: string;
  otpError: string | null;
  rememberMe: boolean;
  isOtpLoading: boolean;
  isOtpSubmitDisabled: boolean;
  onOtpChange: (value: string) => void;
  handleOtpSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setRememberMe: (value: boolean) => void;
  resendSecondsLeft: number;
  onResendOtp: () => void;
}

const LoginScene = (props: LoginSceneProps) => {
  const {
    control,
    showPassword,
    status,
    isSubmitDisabled,
    onSubmit,
    setIsShowPassword,
    isVerificationPage,
    otp,
    otpError,
    rememberMe,
    isOtpLoading,
    isOtpSubmitDisabled,
    onOtpChange,
    handleOtpSubmit,
    setRememberMe,
    resendSecondsLeft,
    onResendOtp,
  } = props;

  const router = useRouter();

  return (
    <Card className="w-full max-w-md rounded-2xl border-none bg-white shadow-2xl shadow-blue-900/10">
      {!isVerificationPage && (
        <>
          <CardHeader className="items-center text-center">
            <span className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Package className="size-8" />
            </span>
            <CardTitle className="text-2xl">HealthO EMS</CardTitle>
            <CardDescription>Logistics Management System</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-6" onSubmit={onSubmit}>
              <InputFieldOnly
                name="email"
                control={control}
                label="Email"
                placeholder="Enter Email Address"
                id="email"
                autoComplete="email"
              />
              <PasswordField
                name="password"
                control={control}
                label="Password"
                placeholder="Enter Password"
                id="password"
                autoComplete="current-password"
                showPassword={showPassword}
                onTogglePassword={() => setIsShowPassword(!showPassword)}
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Need help signing in?</span>
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </>
      )}

      {isVerificationPage && (
        <>
          <CardHeader className="items-center text-center">
            <span className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Package className="size-8" />
            </span>
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
            <CardDescription>
              Enter the one-time passcode sent to your registered contact.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 pt-2">
            <form className="space-y-8" onSubmit={handleOtpSubmit}>
              <div className="space-y-4 pt-4">
                <OtpInput
                  value={otp}
                  onChange={onOtpChange}
                  numInputs={6}
                  inputType="tel"
                  renderInput={(inputProps) => (
                    <Input
                      {...inputProps}
                      className="h-14 w-12 border-2 rounded-2xl bg-white text-center text-xl font-semibold text-black outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-400 sm:h-14 sm:w-14"
                      style={{ color: '#000' }}
                    />
                  )}
                  shouldAutoFocus
                  containerStyle="flex items-center justify-center gap-3 sm:gap-4"
                />
                <p className="text-center text-sm text-neutral-500">
                  Enter the 6-digit code we sent you.
                </p>
                {otpError && (
                  <p className="text-center text-sm text-red-500">{otpError}</p>
                )}
                <label className="mt-2 flex items-center justify-center gap-2 text-xs text-neutral-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3 w-3 accent-blue-600"
                  />
                  <span>Keep me signed in on this device for 30 days.</span>
                </label>
                <p className="mt-3 text-center text-xs text-neutral-500">
                  Didn&apos;t receive the code?{" "}
                  {resendSecondsLeft > 0 ? (
                    <span>Resend available in {resendSecondsLeft}s.</span>
                  ) : (
                    <button
                      type="button"
                      onClick={onResendOtp}
                      className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Resend code
                    </button>
                  )}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isOtpSubmitDisabled}
              >
                {isOtpLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="mt-6 flex flex-col gap-3 border-t border-blue-100 pt-6 text-sm text-neutral-600">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Back to sign in
            </button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default LoginScene;
