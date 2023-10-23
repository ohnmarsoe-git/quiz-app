import { useContext, PropsWithChildren, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { Link } from 'react-router-dom';
import Logout from '../../components/Logout';

const MainLayout = ({ children }: PropsWithChildren) => {
  const { authAdminState } = useContext(AuthContext);
  const [toggle, setToggle] = useState(0);

  const handleToggle = (value: number) => {
    setToggle(toggle === value ? 0 : value);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Q&A Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white hidden md:block">
            {authAdminState?.email}
          </span>
          <i className="fas fa-user-circle text-white text-2xl" />
          <div
            className="lg:hidden md:block space-y-2 cursor-pointer"
            onClick={() => handleToggle(5)}
          >
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-wrap">
        <aside
          className={`${
            toggle ? 'block' : 'hidden'
          } w-64 bg-gray-800 text-white min-h-screen p-4 lg:block`}
        >
          <nav>
            <ul className="space-y-2">
              {authAdminState.isAdminAuth &&
                authAdminState.role === 'admin' && (
                  <>
                    <li
                      className="opcion-con-desplegable"
                      id="opicon-1"
                      onClick={() => handleToggle(1)}
                    >
                      <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700">
                        <div className="flex items-center">
                          <i className="fas fa-calendar-alt mr-2" />
                          <span>Dashboard</span>
                        </div>
                        <i className="fas fa-chevron-down text-xs" />
                      </div>
                      <ul
                        className={`${
                          toggle === 1 ? 'desplegable' : 'desplegable hidden'
                        } ml-4`}
                      >
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />{' '}
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/score"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />
                            Score Lists
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className="opcion-con-desplegable cursor-pointer"
                      onClick={() => handleToggle(3)}
                    >
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                          <i className="fas fa-chart-bar mr-2" />
                          <span>Questions</span>
                        </div>
                        <i className="fas fa-chevron-down text-xs" />
                      </div>
                      <ul
                        className={`${
                          toggle === 3 ? 'desplegable' : 'desplegable hidden'
                        } ml-4`}
                      >
                        <li>
                          <Link
                            to="/admin/question/list"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />{' '}
                            Lists{' '}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/question/add"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />{' '}
                            New Question{' '}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/categories"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />{' '}
                            Categories{' '}
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className="opcion-con-desplegable cursor-pointer"
                      id="opicon-2"
                      onClick={() => handleToggle(2)}
                    >
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                          <i className="fas fa-user mr-2" />
                          <span>Users</span>
                        </div>
                        <i className="fas fa-chevron-down text-xs" />
                      </div>
                      <ul
                        className={`${
                          toggle === 2 ? 'desplegable' : 'desplegable hidden'
                        } ml-4`}
                      >
                        <li>
                          <Link
                            to="/admin/user/list"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />
                            Lists
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/user/add"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />
                            Add New
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />
                            Settings
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="opcion-con-desplegable">
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                          <i className="fas fa-file-alt mr-2" />
                          <span>Documentation</span>
                        </div>
                        <i className="fas fa-chevron-down text-xs" />
                      </div>
                      <ul className="desplegable ml-4 hidden">
                        <li>
                          <Link
                            to="#"
                            className="block p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />
                            Firmas pendientes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="block p-2 hover:bg-gray-700 flex items-center"
                          >
                            <i className="fas fa-chevron-right mr-2 text-xs" />
                            Documentos
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="opcion-con-desplegable">
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                        <div className="flex items-center">
                          <i className="fas fa-sign-out-alt mr-2" />
                          <span>
                            <Logout />
                          </span>
                        </div>
                      </div>
                    </li>
                  </>
                )}
            </ul>
          </nav>
        </aside>

        <div
          className={`${
            toggle === 5 ? 'hidden' : 'lg:block w-full md:w-1/2'
          } flex-1 p-4 bg-gray-100`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
