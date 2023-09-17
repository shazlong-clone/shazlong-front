import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectDoctor() {
  const { doctor } = useSelector((state) => state?.auth);
  return doctor?._id ? <Outlet /> : <Navigate to="/join-us" />;
}

export default ProtectDoctor;
