import { useState, useContext } from 'react';
import AuthContext from '../context/authProvider';
import BASEAPI from '../API/config';

const useLogin = () => {
  const api: any = BASEAPI();

  const { loginDispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [onerrors, setOnErrors] = useState({
    email: '',
    password: ''
  });

  const handleGoogle = (response: any) => {
    api
      .post(`/login`, JSON.stringify({ credential: response.credential }))
      .then((res: any) => {
        if (res.status === 200) {
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
        setLoading(false);
      })
      .catch((error: any) => {
        setOnErrors(error.response.data.errors);
      });
  };

  const handleGithub = (code: string) => {
    try {
      api
        .post(`/gitlogin`, JSON.stringify({ code: code }))
        .then((res: any) => {
          if (res.status === 200) {
            loginDispatch({
              id: res.data.id,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              email: res.data.email,
              role: 'user',
              authToken: res.data.accessToken,
              refreshToken: res.data.refreshToken
            });
            setLoading(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setOnErrors(error.response.data.errors);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data: any) => {
    try {
      api
        .post(`/login`, JSON.stringify(data))
        .then((res: any) => {
          if (res.status === 200) {
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
        })
        .catch((error: any) => {
          setOnErrors(error.response.data.errors);
        });
    } catch (err: any) {
      setOnErrors(err.response.data);
    }
  };

  return {
    loading,
    onerrors,
    onSubmit,
    handleGoogle,
    handleGithub
  };
};

export default useLogin;
