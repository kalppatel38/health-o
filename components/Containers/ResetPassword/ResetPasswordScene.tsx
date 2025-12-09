"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Package, Loader2 } from "lucide-react";
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
import { PasswordField } from "@/src/component/FormFields/FormFieldsComponent";
import { ResetPasswordFormInputs } from "@/src/schemas/resetPasswordSchema";

interface ResetPasswordSceneProps {
  control: Control<ResetPasswordFormInputs>;
  submitted: boolean;
  error: string | null;
  isSubmitDisabled: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  token: string | null;
}

const ResetPasswordScene = (props: ResetPasswordSceneProps) => {
  const { control, submitted, error, isSubmitDisabled, onSubmit, token } = props;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="w-full max-w-md rounded-2xl border-none bg-white shadow-2xl shadow-blue-900/10">
      <CardHeader className="items-center text-center">
        <span className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <Package className="size-8" />
        </span>
        <CardTitle className="text-2xl">Set New Password</CardTitle>
        <CardDescription>
          {token
            ? "Choose a strong password to secure your account."
            : "Set a new password for your account."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-6" onSubmit={onSubmit}>
          <PasswordField
            name="newPassword"
            control={control}
            label="New password"
            placeholder="Enter new password"
            id="newPassword"
            autoComplete="new-password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <PasswordField
            name="confirmPassword"
            control={control}
            label="Confirm password"
            placeholder="Re-enter new password"
            id="confirmPassword"
            autoComplete="new-password"
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          {submitted && !error && (
            <p className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
              Your password has been updated. Redirecting you to sign in...
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
            {isSubmitDisabled ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update password"
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
    </Card>
  );
};

export default ResetPasswordScene;

