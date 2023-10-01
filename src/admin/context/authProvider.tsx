import React, { createContext, useCallback, useEffect, useReducer, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthActionEnum } from './authActions';
import authReducer, {AuthState, defaultAuthState} from './AuthReducer';


export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export type UserData = {
  email: string,
  role: string,
  authToken: string,
  refreshToken: string
}

export interface IAuthContext {
  authState: AuthState,
  loginDispatch: (props: UserData) => void;
  logoutDispatch: () => void
}

// const AuthContext = createContext( {} as AuthContextType)

const AuthContext = createContext<IAuthContext>({
  authState: defaultAuthState,
  loginDispatch: () => {},
  logoutDispatch: () => {}
});


export const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  
  const [cookies, setCookies, removeCookie] = useCookies();
  const [authState, setAuthState] = useReducer(authReducer, defaultAuthState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = cookies.user;
    if(user) {
      const userData: UserData = user || JSON.parse(user);
      setAuthState({type: AuthActionEnum.LOG_IN, payload: userData})
    } else {
      if(location.pathname.includes('admin')) {
        navigate('/admin/login')
      }else {
        navigate('/')
      }
    }
  }, [])

  const loginDispatch = useCallback(
    (props: UserData) => {
      const {  email, role, authToken, refreshToken } = props
      
      setAuthState({
        type: AuthActionEnum.LOG_IN,
        payload: {
          email,
          role,
          authToken,
          refreshToken
        }
      })

      setCookies('user', JSON.stringify({ 
        "isAuth": true , 
        "email": email,
        "role": role,
        "authToken": authToken,
        "refreshToken": refreshToken
      }) );

      if(role === "admin") {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    },
    [navigate]
  )

  const logoutDispatch = useCallback( () => {

    const user = cookies.user;
    
    setAuthState({
      type: AuthActionEnum.LOG_OUT,
      payload: null
    });

    if(user.role === 'user') {
      removeCookie('user');
      navigate('/login')
    } else {
      removeCookie('user');
      navigate('/admin/login')
    }

  },[navigate])


  return (
    <AuthContext.Provider value={{ authState, loginDispatch, logoutDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext