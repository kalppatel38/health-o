import { fetch } from "../../libs/helpers";

// Auth data interfaces matching svastha pattern

export interface SessionObject {
  id?: string;
  orgId?: string;
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  geoIPCountry?: string;
  ipAddress?: string;
  userAgent?: string;
  status?: string;
  createdAt?: string;
  expiredAt?: string;
  lockedAt?: string;
  loginAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface UserObject {
  id?: string;
  orgId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userType?: string;
  permissionGroupId?: string;
  status?: string;
  invitationToken?: string;
  tokenExpireAt?: string;
  phone?: string;
  code?: number;
  designation?: string;
  image?: string;
  patientIds?: string;
  createdBy?: string;
  _2FA?: boolean;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface LoginPayload {
  email: string;
  password: string;
  otpExtensionToken?: string;
  gReCaptchaToken?: string;
}

export interface LoginSuccessResponse {
  session?: SessionObject;
  user?: UserObject;
  role?: string;
  permissions?: Array<any>;
  org?: any;
  customer?: any;
  [key: string]: any;
}

export interface LoginUserSuccessResponse {
  session?: SessionObject;
  user?: UserObject;
  role?: string;
  permission?: Array<any>;
  org?: any;
  customer?: any;
  [key: string]: any;
}

export interface LoginState {
  data?: LoginSuccessResponse | any;
  isLoading?: boolean;
  error?: string | null;
}

export interface LoginUserState {
  data?: LoginUserSuccessResponse | any;
  isLogin?: boolean;
  error?: string | null;
  isLoading?: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
  gReCaptchaToken?: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  invitationToken?: string | string[];
  gReCaptchaToken?: string;
}

export interface OtpPayload {
  otp: number;
  otpReference: string;
  isOtpExtension?: boolean;
  gReCaptchaToken?: string;
}

// Auth API functions matching svastha pattern exactly

export const loginAPI = async (
  payload: LoginPayload
): Promise<LoginSuccessResponse> => {
  return fetch("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const getLoginUser = async ({
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

export const logoutAPI = async ({
  sessionId,
}: {
  sessionId: string;
}): Promise<any> => {
  return fetch(`/auth/logout`, {
    method: "POST",
    body: { sessionId },
  });
};

export const forgotPasswordAPI = async (
  payload: ForgotPasswordPayload
): Promise<any> => {
  return fetch("/auth/forgotPassword", {
    method: "POST",
    body: payload,
  });
};

export const resetPasswordAPI = async (
  payload: ResetPasswordPayload
): Promise<any> => {
  return fetch("/auth/resetPassword", {
    method: "POST",
    body: payload,
  });
};

export const verifyInvitationTokenAPI = async (
  payload: any = {}
): Promise<any> => {
  return fetch("/user/verify-invitation-token", {
    method: "POST",
    body: payload,
  });
};

export const changePasswordAPI = async ({
  payload,
}: {
  payload: any;
}): Promise<any> => {
  return fetch("/auth/changePassword", {
    method: "POST",
    body: payload,
  });
};

export const updateUserAPI = async ({
  payload,
}: {
  payload: any;
}): Promise<any> => {
  return fetch("/auth/profile", {
    method: "PUT",
    body: payload,
  });
};

export const defaultCustomerAPI = async ({
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

export const updateUserSettingsAPI = async ({
  payload,
}: {
  payload: any;
}): Promise<any> => {
  return fetch("/updateUserSettings", {
    method: "PUT",
    body: payload,
  });
};

export const otpVerificationAPI = async (payload: OtpPayload): Promise<any> => {
  return fetch("/auth/verifyOtp", {
    method: "POST",
    body: payload,
  });
};

export const resendOtpAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/resendOtp", {
    method: "POST",
    body: payload,
  });
};

export const lockUserAPI = async (): Promise<any> => {
  return fetch("/auth/lockUser", {
    method: "GET",
  });
};

export const unLockUserAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/unLockUser", {
    method: "POST",
    body: payload,
  });
};

export const twoFaEnableAPI = async (): Promise<any> => {
  return fetch("/auth/2FA/enable", {
    method: "POST",
  });
};

export const twoFaDisableAPI = async (): Promise<any> => {
  return fetch("/auth/2FA/disable", {
    method: "POST",
  });
};

export const twoFaSendCodeAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/2FA/sendCode", {
    method: "POST",
    body: payload,
  });
};

export const twoFaVerifyCodeAPI = async (payload: any): Promise<any> => {
  return fetch("/auth/2FA/verifyCode", {
    method: "POST",
    body: payload,
  });
};

export const resetDefaultLoginPreferenceAPI = async (): Promise<any> => {
  return fetch("/auth/reset-default-login-preference", {
    method: "PUT",
  });
};

