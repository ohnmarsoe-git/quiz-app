import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import AuthContext from '../../context/authProvider';
import PrivateRoute from '../components/PrivateRoute';
import Login from './Login';
import Dashboard from '../pages/Dashboard';
import Questions from '../pages/Questions';
import ScoreList from './ScoreList';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';
import Categories from './Categories';
import Users from '../pages/Users';
import Logout from './Logout';
import AddUser from './AddUser';
import EditUser from './EditUser';
import MainLayout from './MainLayout';
import NotFound from './NotFound';

function AdminLayout() {
  const { authAdminState } = useContext(AuthContext);

  return authAdminState.isAdminAuth ? (
    <MainLayout>
      <Routes>
        <Route path="/" element={<PrivateRoute isAllowed={authAdminState} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/score" element={<ScoreList />} />
          <Route path="/question" element={<Outlet />}>
            <Route path="list" element={<Questions />} />
            <Route path=":id" element={<EditQuestion />} />
            <Route path="add" element={<AddQuestion />} />
          </Route>
          {/* <Route path="/questions/:id" element={<EditQuestion />} />
                <Route path="/add" element={<AddQuestion />} /> */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/user" element={<Outlet />}>
            <Route path="list" element={<Users />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="add" element={<AddUser />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}

export default AdminLayout;
