import React, { useContext, useEffect } from 'react'
import { redirect, useLocation } from 'react-router-dom';
import BASEAPI from '../../API/config';
import AuthContext from '../context/authProvider';

type Props = {

}

const Logout = ({}: Props) => {

  const { authState, logoutDispatch } = useContext(AuthContext);

  const { authToken } = authState;

  const location = useLocation();

  const api:any = BASEAPI();

  useEffect(() => {
    if(location.pathname === '/admin/logout') {
      logoutDispatch();
    } else if(location.pathname === '/logout') {
      logoutDispatch();
    }
  }, [])

  const handleLogout = async (e:any) => {
    e.preventDefault();

      api.post(`/logout`, { token: authToken }).then((res: any) => {

        console.log(res.status);

        if(res.status === 200){
          delete api.defaults.headers.common['Authorization']
          logoutDispatch();

          if(location.pathname === '/admin/logout') {
            return redirect('/admin/login'); 
          } else {
            return redirect('/login'); 
          }
        }
      }).catch( (error:any) => {

        if(error.response) {
          if(error.response.status === 403 && error.response.data === 'No token provided') {
            logoutDispatch();
            if(location.pathname === '/admin/logout') {
              return redirect('/admin/login'); 
            } else {
              return redirect('/login'); 
            }
          }
  
          if(error.response.status === 401) {
            logoutDispatch();
            if(location.pathname === '/admin/logout') {
              return redirect('/admin/login'); 
            } else {
              return redirect('/login'); 
            }
          }
        }
        logoutDispatch();
        if(location.pathname === '/admin/logout') {
          return redirect('/admin/login'); 
        } else {
          return redirect('/login'); 
        }
      })

  }

  return (
    <>
      {  
        authState?.role === 'admin' && (  
          <button onClick={handleLogout}>Logout</button>
        )
      }

      {  
        authState?.role === 'user' && (  
          <button onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
        )
      }
    </>
   
  )
}

export default Logout