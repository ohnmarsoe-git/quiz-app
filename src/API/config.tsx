import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { redirect, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authProvider';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASEAPI = () => {
  let token;

  const location = useLocation();

  const { authState, authAdminState, loginDispatch, logoutDispatch } =
    useContext(AuthContext);

  if (!location.pathname.includes('admin') && authState.isAuth)
    token = authState.refreshToken;

  if (location.pathname.includes('admin') && authAdminState.isAdminAuth)
    token = authAdminState.refreshToken;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  axiosInstance.interceptors.request.use(
    async (config: any) => {
      let currentDate = new Date();
      let token = authState.refreshToken;
      if (authState.isAuth && token) {
        let decodedToken: any = jwt_decode(token);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          try {
            const res: any = await axios.post(`${BASE_URL}/refreshtoken`, {
              token: token
            });
            if (res.status === 200) {
              config.defaults.headers['authorization'] =
                'Bearer ' + res.data.refreshToken;
              loginDispatch({
                id: res.data.id,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                role: res.data.role,
                authToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
              });
            }
          } catch (error) {
            if (authState.isAuth) {
              logoutDispatch('user');
              localStorage.removeItem('user');
              return redirect('/login');
            }

            if (authAdminState.isAdminAuth) {
              logoutDispatch('admin');
              localStorage.removeItem('userAdmin');
              return redirect('/admin/login');
            }
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default BASEAPI;
