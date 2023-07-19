import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const adminToken = localStorage.getItem('adminToken');

  // Verificar si el token de administrador existe y es válido
  const isAuthenticated = adminToken && adminToken !== 'undefined';

  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/loginadmin" replace={true} />
  );
};

export default PrivateRoute;