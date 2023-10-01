import { useState, useContext } from 'react'
import AuthContext from '../admin/context/authProvider';
import BASEAPI from '../API/config'

const useLogin = () => {
  
  const api:any = BASEAPI();

  const { loginDispatch } = useContext(AuthContext);

  const [ onerrors , setOnErrors] = useState({
    email: '', password: ''
  })

  const onSubmit = (data:any) => {

    try {
      api.post(`/login`, JSON.stringify(data)).
      then( (res:any) => {
          if(res.status === 200) {
            loginDispatch({
              email: res.data.email,
              role: res.data.role,
              authToken: res.data.accessToken,
              refreshToken: res.data.refreshToken
            })
          }
        }
      ).catch( (error:any) => {
        setOnErrors(error.response.data.errors);
      }) 
    } catch(err : any) {
      setOnErrors(err.response.data);
    }
    
  }

  return {
    onerrors,
    onSubmit
  }
}

export default useLogin;