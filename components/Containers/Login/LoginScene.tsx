"use client";

import { Eye, EyeOff, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Control, FieldErrors } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputFieldOnly, PasswordField } from "@/src/component/FormFields/FormFieldsComponent";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginSceneProps {
  control: Control<LoginFormData>;
  showPassword: boolean;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  role: string | null;
  isSubmitDisabled: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  setIsShowPassword: (show: boolean) => void;
  formErrors: FieldErrors<LoginFormData>;
}

export function LoginScene(props: LoginSceneProps) {
  const {
    control,
    showPassword,
    status,
    error,
    role,
    isSubmitDisabled,
    onSubmit,
    setIsShowPassword,
    formErrors,
  } = props;

  return (
    <Card className="w-full max-w-md rounded-2xl border-none bg-white shadow-2xl shadow-blue-900/10">
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
    </Card>
  );
}

