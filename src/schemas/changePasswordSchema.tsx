import * as Yup from "yup";

// Password regex from svastha (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;

export interface ChangePasswordFormInputs {
  oldPassword: string;
  newPassword: string;
}

export const ChangePasswordFormValidateSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Please Enter Current Password")
    .test("minLength", "Must be 8 characters or more", function (value) {
      if (!value) return false; // Required check
      return value.length >= 8;
    }),
  newPassword: Yup.string()
    .required("Please Enter New Password")
    .test("minLength", "Must be 8 characters or more", function (value) {
      if (!value) return false; // Required check
      return value.length >= 8;
    })
    .test("newPasswordValidate", "Doesn't match with password requirement.", function (value) {
      if (!value) return true; // Allow empty (required check handles this)
      return PASSWORD_REGEX.test(value);
    }),
}).required();

