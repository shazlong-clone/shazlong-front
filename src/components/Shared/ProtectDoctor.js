import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DoctorLayout from '../Doctor/index';
import { useTranslation } from 'react-i18next';

function ProtectDoctor() {
  const { i18n } = useTranslation();
  const { doctor } = useSelector((state) => state?.auth);
  return doctor?._id ? <DoctorLayout /> : <Navigate to={`/${i18n.language}/join-us`} />;
}

export default ProtectDoctor;
