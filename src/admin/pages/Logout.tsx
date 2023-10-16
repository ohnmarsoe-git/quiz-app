import React, { useContext, useEffect } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import BASEAPI from '../../API/config';
import AuthContext from '../../context/authProvider';

type Props = {};

const Logout = ({}: Props) => {
  const { authState, logoutDispatch } = useContext(AuthContext);

  const { authToken } = authState;

  const location = useLocation();

  const api: any = BASEAPI();

  useEffect(() => {
    if (location.pathname === '/admin/logout') {
      logoutDispatch();
    } else if (location.pathname === '/logout') {
      logoutDispatch();
    }
  }, []);

  const handleLogout = async (e: any) => {
    e.preventDefault();

    api
      .post(`/logout`, { token: authToken })
      .then((res: any) => {
        if (res.status === 200) {
          delete api.defaults.headers.common['Authorization'];
          logoutDispatch();

          if (location.pathname === '/admin/logout') {
            return redirect('/admin/login');
          } else {
            return redirect('/login');
          }
        }
      })
      .catch((error: any) => {
        if (error.response) {
          if (
            error.response.status === 403 &&
            error.response.data === 'No token provided'
          ) {
            logoutDispatch();
            if (location.pathname === '/admin/logout') {
              return redirect('/admin/login');
            } else {
              return redirect('/login');
            }
          }

          if (error.response.status === 401) {
            logoutDispatch();
            if (location.pathname === '/admin/logout') {
              return redirect('/admin/login');
            } else {
              return redirect('/login');
            }
          }
        }
        logoutDispatch();
        if (location.pathname === '/admin/logout') {
          return redirect('/admin/login');
        } else {
          return redirect('/login');
        }
      });
  };

  return (
    <>
      {authState?.role === 'admin' && (
        <button onClick={handleLogout}>Logout</button>
      )}

      {authState?.role === 'user' && (
        <button
          onClick={handleLogout}
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
