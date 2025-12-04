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

