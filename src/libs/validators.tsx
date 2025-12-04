import * as yup from "yup";

// Validators matching svastha's validation patterns exactly
// This file mirrors svastha/src/libs/validators.tsx but converts redux-form validators to yup schemas
// Svastha uses simple functions that return undefined (valid) or error message (invalid)
// We convert these to yup validation methods for use with react-hook-form

// Email regex matching svastha's exact pattern
const EMAIL_REGEX =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

// Phone number regex matching svastha's pattern
const PHONE_REGEX = /^([0-9-,+])+$/;

// Password regex matching svastha's pattern (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;

// Blank field regex
const BLANK_FIELD_REGEX = /^\s*\S[\s\S]*$/;

// Space validation regex
const SPACE_VALIDATE_REGEX = /^(?!\s)(?!.*\s$).*/;

// Decimal validation regex (2 decimal places)
const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/;

// YouTube URL regex
const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;

// URL validation regex (matching svastha's complex pattern)
const URL_REGEX =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?)))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

// Export regex patterns for direct use (matching svastha exports)
export const spaceValidateRegEx = SPACE_VALIDATE_REGEX;
export const blankSpaceValidate = BLANK_FIELD_REGEX;

// ==================== Yup Validation Methods (converted from svastha's redux-form validators) ====================

// Required field validation (matching svastha: value || typeof value === 'number' ? undefined : 'required')
export const required = (message = "required") =>
  yup.mixed().test("required", message, (value) => !!(value || typeof value === "number"));

// Required with label (matching svastha: requiredLabel(label))
export const requiredLabel = (label: string) =>
  yup.mixed().test("required", `Please Enter ${label}`, (value) => !!(value || typeof value === "number"));

// Required select (matching svastha: requiredSelect(label))
export const requiredSelect = (label: string) =>
  yup.mixed().required(`Please Select ${label}`);

// Max length (matching svastha: maxLength(max, type))
export const maxLength = (max: number, type?: string) =>
  yup
    .string()
    .max(max, `Must be ${max} ${type === "number" ? "digits" : "characters"} or less`);

// Min length (matching svastha: minLength(min, type))
export const minLength = (min: number, type?: string) =>
  yup
    .string()
    .min(min, `Must be ${min} ${type === "number" ? "digits" : "characters"} or more`);

// Email validation (matching svastha's exact email validator logic)
export const email = yup
  .string()
  .test("email", "Please Enter Valid Email Address", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return EMAIL_REGEX.test(value);
  });

// Max email length (matching svastha: maxEmailLength = maxLength(254))
export const maxEmailLength = maxLength(254);

// Min email length (matching svastha: minEmailLength = minLength(5))
export const minEmailLength = minLength(5);

// Number validation (matching svastha: value && isNaN(Number(value)) ? 'Must be a number' : undefined)
export const number = yup
  .number()
  .typeError("Must be a number");

// Positive number (matching svastha: value && Number(value) < 0 ? 'Must be a positive number' : undefined)
export const positiveNumber = yup
  .number()
  .positive("Must be a positive number");

// Min value (matching svastha: minValue(min))
export const minValue = (min: number) =>
  yup.number().min(min, `Must be at least ${min}`);

// Max value (matching svastha: maxValue(max))
export const maxValue = (max: number) =>
  yup.number().max(max, `Must be ${max} or less`);

// Phone number (matching svastha: value && !/^([0-9-,+])+$/.test(value) ? 'Please Enter valid phone number' : undefined)
export const phoneNumber = yup
  .string()
  .test("phoneNumber", "Please Enter valid phone number", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return PHONE_REGEX.test(value);
  });

// Min length phone number (matching svastha: minLengthPhoneNumber(min))
export const minLengthPhoneNumber = (min: number) =>
  yup.string().min(min, "Please Enter Valid Number");

// Password validation (matching svastha's newPasswordValidate exactly)
export const newPasswordValidate = yup
  .string()
  .test("password", "Doesn't match with password requirement.", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return PASSWORD_REGEX.test(value);
  });

// Alpha numeric (matching svastha: value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined)
export const alphaNumeric = yup
  .string()
  .test("alphaNumeric", "Only alphanumeric characters", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return /^[a-zA-Z0-9 ]*$/i.test(value);
  });

// Blank field validate (matching svastha: value && !/^\s*\S[\s\S]*$/.test(value) ? 'Please Enter Value' : undefined)
export const blankFieldValidate = yup
  .string()
  .test("blankField", "Please Enter Value", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return BLANK_FIELD_REGEX.test(value);
  });

// Space validate (matching svastha: value && !/^(?!\s)(?!.*\s$).*/.test(value) ? 'Please enter valid text.' : undefined)
export const spaceValidate = yup
  .string()
  .test("spaceValidate", "Please enter valid text.", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return SPACE_VALIDATE_REGEX.test(value);
  });

// Decimal validate (matching svastha: value && !/^\d+(\.\d{1,2})?$/.test(value) ? 'Please enter only 2 digit after decimal point' : undefined)
export const decimalValidate = yup
  .string()
  .test("decimal", "Please enter only 2 digit after decimal point", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return DECIMAL_REGEX.test(value);
  });

// URL validate (matching svastha's complex urlValidate)
export const urlValidate = yup
  .string()
  .test("url", "Please Enter Valid URL", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return URL_REGEX.test(value);
  });

// YouTube video URL (matching svastha: value && !/^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/.test(value) ? 'Please Enter correct youtube video URL' : undefined)
export const youtubeVideoURL = yup
  .string()
  .test("youtube", "Please Enter correct youtube video URL", function (value) {
    if (!value) return true; // Allow empty (required check is separate)
    return YOUTUBE_URL_REGEX.test(value);
  });

// Validate integer (matching svastha: value && !Number.isInteger(Number(value)) ? 'Must be a whole number (integer)' : undefined)
export const validateInteger = yup
  .number()
  .integer("Must be a whole number (integer)")
  .typeError("Must be a whole number (integer)");

// Validate greater than zero (matching svastha's validateGreaterThanZero exactly)
export const validateGreaterThanZero = yup
  .mixed()
  .test("greaterThanZero", "Must be a number greater than zero", function (value) {
    if (value === null || value === undefined) return true; // Allow empty (required check is separate)
    const stringValue = String(value);
    if (stringValue.startsWith("0")) {
      return this.createError({ message: "Number cannot start with zero" });
    }
    const parsedValue = parseFloat(stringValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      return false;
    }
    return true;
  })
  .typeError("Must be a number greater than zero");

// ==================== Common Validation Schemas ====================

// Login form schema - email only (no username)
// Email validation: required, valid email format, max 254 characters
// Password validation: required, min 8 characters
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please Enter Email Address")
    .test("email-format", "Please Enter Valid Email Address", function (value) {
      // Email validator: value must match email regex pattern
      if (!value) return true; // Allow empty (required check handles this)
      return EMAIL_REGEX.test(value);
    })
    .test("email-max-length", "Must be 254 characters or less", function (value) {
      if (!value) return true;
      return value.length <= 254;
    }),
  password: yup
    .string()
    .required("Please Enter Password")
    .test("password-min-length", "Must be 8 characters or more", function (value) {
      if (!value) return false; // Required check
      return value.length >= 8;
    }),
});

// Forgot password schema
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please Enter Email Address")
    .matches(EMAIL_REGEX, "Please Enter Valid Email Address")
    .max(254, "Email must be 254 characters or less"),
});

// Reset password schema (matching svastha's validation pattern exactly)
// In svastha ResetPasswordScene.tsx:
//   const passwordRequired = requiredLabel('Password');
//   const passwordMinLength = minLength(8);
//   validate={[passwordRequired, passwordMinLength, newPasswordValidate]} for newPassword field
// Note: svastha only has newPassword field in form, confirmPassword is set in container (confirmPassword = newPassword)
// health-o has both fields in UI, so we validate both but match svastha's pattern for newPassword
export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Please Enter New Password")
    .test("minLength", "Must be 8 characters or more", function (value) {
      if (!value) return false; // Required check
      return value.length >= 8;
    })
    .test("newPasswordValidate", "Doesn't match with password requirement.", function (value) {
      if (!value) return true; // Allow empty (required check handles this)
      return PASSWORD_REGEX.test(value);
    }),
  confirmPassword: yup
    .string()
    .required("Please Confirm Password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
  invitationToken: yup.string().required(),
});

// OTP schema
export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("Please Enter OTP")
    .length(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
  otpReference: yup.string().required(),
});

// ==================== Helper Functions ====================

// Helper to create custom validation messages (matching svastha pattern)
export const createValidator = (
  validator: yup.Schema,
  customMessage?: string
) => {
  return validator.test("custom", customMessage || "Invalid value", function (value) {
    try {
      validator.validateSync(value);
      return true;
    } catch (err: any) {
      return this.createError({
        message: customMessage || err.message,
      });
    }
  });
};

// Export all validators for use in yup schemas
export default {
  required,
  requiredLabel,
  requiredSelect,
  maxLength,
  minLength,
  email,
  maxEmailLength,
  minEmailLength,
  number,
  positiveNumber,
  minValue,
  maxValue,
  phoneNumber,
  minLengthPhoneNumber,
  newPasswordValidate,
  alphaNumeric,
  blankFieldValidate,
  spaceValidate,
  decimalValidate,
  urlValidate,
  youtubeVideoURL,
  validateInteger,
  validateGreaterThanZero,
  // Schemas
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  otpSchema,
};

