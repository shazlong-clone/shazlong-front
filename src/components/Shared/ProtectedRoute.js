import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Message, toaster } from 'rsuite';

function ProtectedRoute() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state?.auth);
  toaster.push(<Message type="error">{t('Sign_In_First')}</Message>, { placement: 'topCenter' });
  return user?._id ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
