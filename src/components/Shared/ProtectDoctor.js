import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DoctorLayout from '../Doctor/index';

function ProtectDoctor() {
  const { doctor } = useSelector((state) => state?.auth);
  return doctor?._id ? <DoctorLayout /> : <Navigate to="/join-us" />;
}

export default ProtectDoctor;
