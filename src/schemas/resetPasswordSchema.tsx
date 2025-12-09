import * as Yup from "yup";

// Password regex matching svastha's pattern (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;

export interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
  invitationToken: string;
}

export const ResetPasswordFormValidateSchema = Yup.object().shape({
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
  confirmPassword: Yup.string()
    .required("Please Confirm Password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  invitationToken: Yup.string().required("Invitation token is required"),
}).required();

