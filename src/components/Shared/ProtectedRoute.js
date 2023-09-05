import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { user } = useSelector((state) => state?.auth);
  return user?._id ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
