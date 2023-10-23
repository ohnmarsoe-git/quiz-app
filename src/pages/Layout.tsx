import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from '../context/authProvider';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import Quiz from './Quiz';
import Login from './Login';
import SignIn from './SignIn';
import Main from './Main';
import Settings from './Settings';
import Results from './Results';

const Layout = () => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.isAuth && <Navbar />}

      <Routes>
        {authState.isAuth && authState.role === 'user' ? (
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Main />} />
            <Route path="/quiz" element={<Main />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/account" element={<Settings />} />
            <Route path="/results" element={<Results />} />
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
};

export default Layout;
