export interface RegisterPayload {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  tos_accept: boolean;
  privacy_policy_accept: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OtpPayload {
  email: string;
  action: 'login' | 'register' | 'passwordReset';
  code: string;
}

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  OtpVerification: { email: string; action: string };
  Success: undefined;
  Dashboard: undefined;
  AllUsers: undefined;
  ChatScreen: undefined;
};

export enum AuthAction {
  LOGIN = 'login',
  REGISTER = 'register',
}
