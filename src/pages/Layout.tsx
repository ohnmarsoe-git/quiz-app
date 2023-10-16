import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Quiz from '../components/Quiz';
import Login from './Login';
import SignIn from './SignIn';
import AuthContext from '../context/authProvider';
import PrivateRoute from '../admin/components/PrivateRoute';
import NotFound from './NotFound';

type Props = {};

function Layout({}: Props) {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.isAuth && authState.role === 'user' && (
        <Navbar email={authState.email} />
      )}

      <Routes>
        {authState.isAuth && authState.role === 'user' ? (
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Quiz />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />}></Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default Layout;
