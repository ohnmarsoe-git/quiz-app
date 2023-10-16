import { Reducer } from 'react';
import { AuthAction } from './authActions';
import { useCookies } from 'react-cookie';

export interface AuthState {
  isAuth: boolean;
  email?: string;
  role?: string;
  authToken?: string;
  refreshToken?: string;
}

export const defaultAuthState: AuthState = {
  isAuth: false
};

const AuthReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  if (action.type === 'LOG_IN') {
    localStorage.setItem('user', JSON.stringify(action.payload));

    return {
      ...state,
      isAuth: true,
      email: action.payload.email,
      role: action.payload.role,
      authToken: action.payload.authToken,
      refreshToken: action.payload.refreshToken
    };
  }

  if (action.type === 'LOG_OUT') {
    localStorage.removeItem('user');
    return {
      ...state,
      isAuth: false,
      email: '',
      role: '',
      authToken: '',
      refreshToken: ''
    };
  }

  return defaultAuthState;
};

export default AuthReducer;
