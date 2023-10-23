import { useState } from 'react';
import BASEAPI from '../API/config';
import { useNavigate } from 'react-router-dom';

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

const useSignup = () => {
  const api: any = BASEAPI();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Props>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [errorshook, setErrorsHook] = useState(null);

  const onSubmit = (data: any) => {
    try {
      api
        .post(`/register`, JSON.stringify(data))
        .then((res: any) => {
          if (res.status === 200) {
            if (data.page === 'admin') {
              navigate('/admin/user/list');
            } else {
              navigate('/login');
            }
          }

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
          });
        })
        .catch((error: any) => {
          setErrorsHook(error.response.data);
        });
    } catch (err: any) {
      setErrorsHook(err.response.data);
    }
  };

  return {
    formData,
    errorshook,
    onSubmit
  };
};

export default useSignup;
