import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer
} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AuthActionEnum } from './authActions';
import authReducer, { AuthState, defaultAuthState } from './AuthReducer';

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export type UserData = {
  id: string;
  email: string;
  role: string;
  authToken: string;
  refreshToken: string;
};

export interface IAuthContext {
  authState: AuthState;
  authAdminState: AuthState;
  loginDispatch: (props: UserData) => void;
  logoutDispatch: (props: string) => void;
}

// const AuthContext = createContext( {} as AuthContextType)

const AuthContext = createContext<IAuthContext>({
  authState: defaultAuthState,
  authAdminState: defaultAuthState,
  loginDispatch: () => {},
  logoutDispatch: () => {}
});

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children
}) => {
  const [authState, setAuthState] = useReducer(authReducer, defaultAuthState);
  const [authAdminState, setAuthAdminState] = useReducer(
    authReducer,
    defaultAuthState
  );
  const navigate = useNavigate();

  useEffect(() => {
    // const user = cookies.user;
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));

    //@ts-ignore
    const userAdmin = JSON.parse(localStorage.getItem('userAdmin'));

    if (user) {
      if (!checkTokenExpiration(user.refreshToken)) {
        if (user) {
          const userData: UserData = user || JSON.parse(user);
          setAuthState({ type: AuthActionEnum.LOG_IN, payload: userData });
        } else {
          navigate('/');
        }
      } else {
        logoutDispatch('user');
      }
    }

    if (userAdmin) {
      if (!checkTokenExpiration(userAdmin.refreshToken)) {
        if (userAdmin) {
          const userAdminData: UserData = userAdmin || JSON.parse(userAdmin);
          setAuthAdminState({
            type: AuthActionEnum.ADMIN_LOG_IN,
            payload: userAdminData
          });
        } else {
          navigate('/admin/login');
        }
      } else {
        logoutDispatch('admin');
      }
    }

    //react-hooks/exhaustive-deps
  }, []);

  // check JWT token
  const checkTokenExpiration = (token: string) => {
    let decodedToken: any = jwt_decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      return true;
    }
  };

  const loginDispatch = useCallback(
    (props: UserData) => {
      const { id, email, role, authToken, refreshToken } = props;

      if (role === 'user') {
        setAuthState({
          type: AuthActionEnum.LOG_IN,
          payload: {
            id,
            email,
            role,
            authToken,
            refreshToken
          }
        });
        navigate('/');
      }

      if (role === 'admin') {
        setAuthAdminState({
          type: AuthActionEnum.ADMIN_LOG_IN,
          payload: {
            id,
            email,
            role,
            authToken,
            refreshToken
          }
        });

        navigate('/admin/dashboard');
      }

      // localStorage.setItem(
      //   'user',
      //   JSON.stringify({
      //     isAuth: true,
      //     email: email,
      //     role: role,
      //     authToken: authToken,
      //     refreshToken: refreshToken
      //   })
      // );

      // setCookies(
      //   'user',
      //   JSON.stringify({
      //     isAuth: true,
      //     email: email,
      //     role: role,
      //     authToken: authToken,
      //     refreshToken: refreshToken
      //   })
      // );
    },
    [navigate]
  );

  const logoutDispatch = useCallback(
    (page: string) => {
      // const user = cookies.user;

      if (page === 'admin') {
        //@ts-ignore
        const userAdmin = JSON.parse(localStorage.getItem('userAdmin'));
        if (userAdmin) {
          setAuthAdminState({
            type: AuthActionEnum.ADMIN_LOG_OUT,
            payload: null
          });
          navigate('/admin/login');
        }
      }

      if (page === 'user') {
      }
    },
    [navigate]
  );

  return (
    <AuthContext.Provider
      value={{ authState, authAdminState, loginDispatch, logoutDispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
