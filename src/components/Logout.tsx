import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BASEAPI from '../API/config';
import AuthContext from '../context/authProvider';

const Logout = () => {
  const api: any = BASEAPI();

  const { authState, authAdminState, logoutDispatch } = useContext(AuthContext);

  const { authToken } = authState;

  const authAdminToken = authAdminState.refreshToken;

  const location = useLocation();

  const navigate = useNavigate();

  const requestHandle = (token: any, page: string) => {
    api
      .post(`/logout`, { token: token })
      .then((res: any) => {
        if (res.status === 200) {
          delete api.defaults.headers.common['Authorization'];
          logoutDispatch(page);

          if (page === 'admin') {
            return navigate('/admin/login');
          } else {
            return navigate('/login');
          }
        }
      })
      .catch((error: any) => {
        if (error.response) {
          logoutDispatch(page);
          if (page === 'admin') {
            return navigate('/admin/login');
          } else {
            return navigate('/login');
          }
        }
      });
  };

  const handleLogout = async (page: string) => {
    if (page === 'admin') {
      requestHandle(authAdminToken, 'admin');
    } else {
      requestHandle(authToken, 'user');
    }
  };

  return (
    <>
      {location.pathname.includes('admin') &&
        authAdminState?.role === 'admin' && (
          <button onClick={() => handleLogout('admin')}>Logout</button>
        )}

      {!location.pathname.includes('admin') && authState?.role === 'user' && (
        <button
          onClick={() => handleLogout('user')}
          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
          role="menuitem"
          tabIndex={-1}
          id="menu-item-3"
        >
          Sign Out
        </button>
      )}
    </>
  );
};

export default Logout;
