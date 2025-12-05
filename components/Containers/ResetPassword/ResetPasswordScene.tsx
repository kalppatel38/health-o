"use client";

import type { FormEvent, ChangeEvent } from "react";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { Label } from "@/components/ui/label";

interface ResetPasswordSceneProps {
  form: {
    password: string;
    confirmPassword: string;
  };
  submitted: boolean;
  error: string | null;
  isSubmitDisabled: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  token: string | null;
}

const ResetPasswordScene = (props: ResetPasswordSceneProps) => {
  const { form, submitted, error, isSubmitDisabled, handleChange, handleSubmit, token } =
    props;
  const router = useRouter();

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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter new password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          {submitted && !error && (
            <p className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
              Your password has been updated. Redirecting you to sign in...
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
            Update password
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

export { ResetPasswordScene };

