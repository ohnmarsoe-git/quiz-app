import React, { useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import AuthContext from '../../context/authProvider'
import { Navigate, Outlet, redirect } from 'react-router-dom';


const PrivateRoute = () => {
  
  const { authState } = useContext(AuthContext);

  return authState.isAuth ? 
      <Outlet /> 
    : 
      <>
        { authState.role === 'user' ? <Navigate to="/login" /> : <Navigate to="/admin/login" /> }
      </>
}

export default PrivateRoute