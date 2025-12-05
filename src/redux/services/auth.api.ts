import { fetch } from "../../libs/helpers";
import type {
  LoginPayload,
  LoginSuccessResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  OtpPayload,
} from "../slices/auth";

// Auth API functions (moved from `src/redux/auth/api.tsx`)

const loginAPI = async (
  payload: LoginPayload
): Promise<LoginSuccessResponse> => {
  return fetch("/auth/login", {
    method: "POST",
    body: payload,
  });
};

const getLoginUser = async ({
  Authorization,
  org,
  customer,
}: {
  Authorization: string;
  org?: string;
  customer?: string;
}): Promise<LoginSuccessResponse> => {
  const headers: any = {
    Authorization,
  };

  if (org) {
    headers.org = org;
  }

  if (customer) {
    headers.customer = customer;
  }

  return fetch(`/auth/whoAmI`, {
    headers,
  });
};

const logoutAPI = async ({
  sessionId,
}: {
  sessionId: string;
}): Promise<any> => {
  return fetch(`/auth/logout`, {
    method: "POST",
    body: { sessionId },
  });
};

const forgotPasswordAPI = async (
  payload: ForgotPasswordPayload 
): Promise<any> => {
  return fetch("/auth/forgotPassword", {
    method: "POST",
    body: payload,
  });
};

const resetPasswordAPI = async (
  payload: ResetPasswordPayload
): Promise<any> => {
  return fetch("/auth/resetPassword", {
    method: "POST",
    body: payload,
  });
};

const verifyInvitationTokenAPI = async (
  payload: any = {}
): Promise<any> => {
  return fetch("/user/verify-invitation-token", {
    method: "POST",
    body: payload,
  });
};

const changePasswordAPI = async ({
  payload,
}: {
  payload: any;
}): Promise<any> => {
  return fetch("/auth/changePassword", {
    method: "POST",
    body: payload,
  });
};

const updateUserAPI = async ({
  payload,
}: {
  payload: any;
}): Promise<any> => {
  return fetch("/auth/profile", {
    method: "PUT",
    body: payload,
  });
};

const defaultCustomerAPI = async ({
  customerId,
  payload,
}: {
  customerId: string;
  payload: any;
}): Promise<any> => {
  return fetch(`/auth/default-customer/${customerId}`, {
    method: "PUT",
    body: payload,
  });
};

const updateUserSettingsAPI = async ({
  payload,
}: {
  payload: any;
}): Promise<any> => {
  return fetch("/updateUserSettings", {
    method: "PUT",
    body: payload,
  });
};

const otpVerificationAPI = async (payload: OtpPayload): Promise<any> => {
  return fetch("/auth/verifyOtp", {
    method: "POST",
    body: payload,
  });
};

const resendOtpAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/resendOtp", {
    method: "POST",
    body: payload,
  });
};

const lockUserAPI = async (): Promise<any> => {
  return fetch("/auth/lockUser", {
    method: "GET",
  });
};

const unLockUserAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/unLockUser", {
    method: "POST",
    body: payload,
  });
};

const twoFaEnableAPI = async (): Promise<any> => {
  return fetch("/auth/2FA/enable", {
    method: "POST",
  });
};

const twoFaDisableAPI = async (): Promise<any> => {
  return fetch("/auth/2FA/disable", {
    method: "POST",
  });
};

const twoFaSendCodeAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/2FA/sendCode", {
    method: "POST",
    body: payload,
  });
};

const twoFaVerifyCodeAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/2FA/verifyCode", {
    method: "POST",
    body: payload,
  });
};

const resetDefaultLoginPreferenceAPI = async (): Promise<any> => {
  return fetch("/auth/reset-default-login-preference", {
    method: "PUT",
  });
};

export default {
  loginAPI,
  getLoginUser,
  logoutAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
  verifyInvitationTokenAPI,
  changePasswordAPI,
  updateUserAPI,
  defaultCustomerAPI,
  updateUserSettingsAPI,
  otpVerificationAPI,
  resendOtpAPI,
  lockUserAPI,
  unLockUserAPI,
  twoFaEnableAPI,
  twoFaDisableAPI,
  twoFaSendCodeAPI,
  twoFaVerifyCodeAPI,
  resetDefaultLoginPreferenceAPI,
};


