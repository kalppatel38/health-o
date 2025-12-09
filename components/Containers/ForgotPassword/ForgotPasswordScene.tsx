"use client";

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
import { InputFieldOnly } from "@/src/component/FormFields/FormFieldsComponent";
import { ForgotPasswordFormInputs } from "@/src/schemas/forgotPasswordSchema";

interface ForgotPasswordSceneProps {
  control: Control<ForgotPasswordFormInputs>;
  submitted: boolean;
  error: string | null;
  isSubmitDisabled: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ForgotPasswordScene = (props: ForgotPasswordSceneProps) => {
  const { control, submitted, error, isSubmitDisabled, onSubmit } = props;
  const router = useRouter();

  return (
    <Card className="w-full max-w-md rounded-2xl border-none bg-white shadow-2xl shadow-blue-900/10">
      <CardHeader className="items-center text-center">
        <span className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <Package className="size-8" />
        </span>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you instructions to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-6" onSubmit={onSubmit}>
          <InputFieldOnly
            name="email"
            control={control}
            label="Email address"
            placeholder="you@example.com"
            id="email"
            type="email"
            autoComplete="email"
          />

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          {submitted && !error && (
            <p className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
              If an account exists for this email, you&apos;ll receive a reset link shortly.
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
            {isSubmitDisabled ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send reset link"
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

export { ForgotPasswordScene };

