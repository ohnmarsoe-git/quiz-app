import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BASEAPI from '../API/config';
import { useCookies } from 'react-cookie';

export function Authenicated () {

  const [cookies] = useCookies(['token']);

  const [statusAuth, setStatusAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.token) {
      BASEAPI.post('/verifytoken', JSON.stringify( { token: cookies.token })).then((res) => {
        console.log(res.status);
        if(res.status === 200) {
          setStatusAuth(true);
        }
      });
    }
  }, [])

  return { statusAuth }
}
