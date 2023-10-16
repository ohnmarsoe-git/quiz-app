import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authProvider';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASEAPI = () => {
  const { authState, loginDispatch, logoutDispatch } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      Authorization: `Bearer ${authState?.refreshToken}`
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
                email: res.data.email,
                role: res.data.role,
                authToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
              });
            } else {
              logoutDispatch();
              return redirect('/login');
            }
          } catch (err) {
            logoutDispatch();
            return redirect('/login');
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
