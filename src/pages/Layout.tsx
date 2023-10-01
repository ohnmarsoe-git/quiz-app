import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Navbar from '../components/Navbar'
import Quiz from '../components/Quiz'
import Login from './Login'
import SignIn from './SignIn';
import AuthContext from '../admin/context/authProvider';
import PrivateRoute from '../admin/components/PrivateRoute';
import NotFound from './NotFound';

type Props = {}

function Layout({}: Props) {

  const { authState } = useContext(AuthContext);

  // if(authState.authToken) {
  //   let currentDate = new Date();
  //   const token:any = authState.authToken;
  //   let decodedToken:any = jwt_decode(token);
  //   console.log(decodedToken.exp * 1000);
  //   if(decodedToken.exp * 1000 < currentDate.getTime()) {
  //     console.log('expire');
  //   }
  // }

  return (
    <>
      { authState.isAuth && (
        <Navbar />
      )}

      {!authState.isAuth && (
        <Login />
      )}

      <Routes>
          { authState.isAuth && authState.role === 'user' ? (
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Quiz />} />
                <Route path="/quiz" element={<Quiz />} />
            </Route>
          
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<SignIn />} />
            </>
          )}
      </Routes>

      
    </>
  )
}

export default Layout