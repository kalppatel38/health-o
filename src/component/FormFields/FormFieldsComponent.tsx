"use client";

import React from "react";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Error rendering component matching svastha's pattern
export const RenderErrorComponent: React.FC<{ error: FieldError | string }> = ({
  error,
}) => {
  if (typeof error === "string") {
    return <>{error}</>;
  } else if (error?.message) {
    // If message is an array (multiple errors), show the first one
    if (Array.isArray(error.message)) {
      return <>{error.message[0]}</>;
    }
    return <>{error.message}</>;
  } else if (error) {
    return <>{String(error)}</>;
  }
  return null;
};

// Input field component using react-hook-form
export interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  className?: string;
  autoCapitalize?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  showError?: boolean;
  defaultValue?: string;
}

export const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  id,
  className = "",
  autoCapitalize,
  autoComplete,
  minLength,
  maxLength,
  min,
  max,
  disabled,
  showError = true,
  defaultValue,
}: InputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as any}
      render={({ field, fieldState: { error, isTouched } }) => (
        <div className="space-y-2">
          {label && <Label htmlFor={id || name}>{label}</Label>}
          <Input
            {...field}
            id={id || name}
            type={type}
            placeholder={placeholder}
            className={`${isTouched && error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${
              isTouched && !error ? "border-green-500" : ""
            } ${className}`}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            max={max}
            disabled={disabled}
          />
          {showError && isTouched && error && (
            <p className="text-sm text-red-600 mt-1">
              <RenderErrorComponent error={error} />
            </p>
          )}
        </div>
      )}
    />
  );
};

// Input field without label (matching svastha's InputFieldOnly)
export const InputFieldOnly = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  id,
  className = "",
  autoCapitalize,
  autoComplete,
  minLength,
  maxLength,
  min,
  max,
  disabled,
  showError = true,
  defaultValue,
}: InputFieldProps<T>) => {
  return (
    <InputField
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      type={type}
      id={id}
      className={className}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      disabled={disabled}
      showError={showError}
      defaultValue={defaultValue}
    />
  );
};

// Password field with show/hide toggle
export interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  autoComplete?: string;
  showError?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const PasswordField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  id,
  className = "",
  autoComplete = "current-password",
  showError = true,
  showPassword = false,
  onTogglePassword,
}: PasswordFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <div className="space-y-2">
          {label && <Label htmlFor={id || name}>{label}</Label>}
          <div className="relative">
            <Input
              {...field}
              id={id || name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className={`${isTouched && error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} ${
                isTouched && !error ? "border-green-500" : ""
              } ${className} pr-12`}
              autoComplete={autoComplete}
            />
            {onTogglePassword && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={onTogglePassword}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            )}
          </div>
          {showError && isTouched && error && (
            <p className="text-sm text-red-600 mt-1">
              <RenderErrorComponent error={error} />
            </p>
          )}
        </div>
      )}
    />
  );
};

