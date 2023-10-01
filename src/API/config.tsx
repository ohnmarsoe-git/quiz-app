import axios from 'axios';
import { useContext } from 'react';
import jwt_decode from 'jwt-decode'
import AuthContext from '../admin/context/authProvider';

const BASE_URL = process.env.REACT_APP_BASE_URL

const BASEAPI = () => {

  const { authState, loginDispatch } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
      "Authorization": `Bearer ${authState?.refreshToken}`
    }
  })

  axiosInstance.interceptors.request.use(
    async(config:any) => {
      let currentDate = new Date();
      let token = authState.refreshToken;
      if(authState.isAuth && token) {
        let decodedToken:any = jwt_decode(token);
        if(decodedToken.exp * 1000 < currentDate.getTime()) {
          const res:any = await axios.post(`${BASE_URL}/refreshtoken`, { "token" : token});
          if(res.data) {
            config.defaults.headers['authorization'] = "Bearer " + res.data.refreshToken;
            loginDispatch({
              email: res.data.email,
              role: res.data.role,
              authToken: res.data.accessToken,
              refreshToken: res.data.refreshToken
            })
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return axiosInstance;
}

export default BASEAPI;

