import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Auth data interfaces (moved from `src/redux/auth/data.interfaces.ts`)

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

// Auth slice (moved from `store/authSlice.ts`)

export interface AuthState {
  // Login state (for login flow)
  login: {
    data: LoginSuccessResponse | any;
    isLoading: boolean;
    error: string | null;
  };
  // Login user state (for authenticated user)
  loginUser: {
    data: LoginUserSuccessResponse | any;
    isLogin: boolean;
    isLoading: boolean;
    error: string | null;
    rememberMe?: boolean; // Store rememberMe preference for cookie setting
  };
}

const initialState: AuthState = {
  login: {
    data: {},
    isLoading: false,
    error: null,
  },
  loginUser: {
    data: {},
    isLogin: false,
    isLoading: false,
    error: null,
    rememberMe: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login actions (matching svastha's LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_RESET)
    loginStarted(state) {
      state.login.isLoading = true;
      state.login.error = null;
    },
    loginSuccess(state, action: PayloadAction<LoginSuccessResponse>) {
      state.login.data = action.payload;
      state.login.isLoading = false;
      state.login.error = null;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.login.isLoading = false;
      state.login.error = action.payload;
    },
    loginReset(state) {
      state.login = initialState.login;
    },

    // Login user actions (matching svastha's FETCH_LOGIN_USER_*)
    fetchLoginUserStarted(state) {
      state.loginUser.isLoading = true;
    },
    fetchLoginUserSuccess(
      state,
      action: PayloadAction<LoginUserSuccessResponse & { rememberMe?: boolean }>
    ) {
      const { rememberMe, ...loginUserData } = action.payload;
      state.loginUser.data = loginUserData;
      state.loginUser.isLogin = true;
      state.loginUser.isLoading = false;
      state.loginUser.error = null;
      if (rememberMe !== undefined) {
        state.loginUser.rememberMe = rememberMe;
      }
    },
    fetchLoginUserUpdate(state, action: PayloadAction<Partial<LoginUserSuccessResponse>>) {
      state.loginUser.data = {
        ...state.loginUser.data,
        ...action.payload,
      };
      state.loginUser.isLogin = true;
      state.loginUser.isLoading = false;
      state.loginUser.error = null;
    },
    fetchLoginUserFail(state, action: PayloadAction<string>) {
      state.loginUser.isLoading = false;
      state.loginUser.error = action.payload;
    },
    fetchLoginUserReset(state) {
      state.loginUser = { ...initialState.loginUser };
    },
  },
});

export const {
  loginStarted,
  loginSuccess,
  loginFail,
  loginReset,
  fetchLoginUserStarted,
  fetchLoginUserSuccess,
  fetchLoginUserUpdate,
  fetchLoginUserFail,
  fetchLoginUserReset,
} = authSlice.actions;

export default authSlice.reducer;


