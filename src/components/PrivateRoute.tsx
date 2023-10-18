import { useContext } from 'react';
import AuthContext from '../context/authProvider';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);

  return authState.isAuth ? (
    <Outlet />
  ) : (
    <>
      {authState.role === 'user' ? (
        <Navigate to="/login" />
      ) : (
        <Navigate to="/admin/login" />
      )}
    </>
  );
};

export default PrivateRoute;
