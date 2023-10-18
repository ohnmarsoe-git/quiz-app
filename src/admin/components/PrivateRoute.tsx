import { useContext } from 'react';
import AuthContext from '../../context/authProvider';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (isAllowed: any) => {
  // const { authAdminState } = useContext(AuthContext);
  console.log(isAllowed);
  return isAllowed ? <Outlet /> : <Navigate replace to="/admin/login" />;
};

export default PrivateRoute;
