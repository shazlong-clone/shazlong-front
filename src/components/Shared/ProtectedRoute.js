import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Message, toaster } from 'rsuite';

function ProtectedRoute() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const { user } = useSelector((state) => state?.auth);
  if (!user?._id) toaster.push(<Message type="error">{t('Sign_In_First')}</Message>, { placement: 'topCenter' });
  return user?._id ? <Outlet /> : <Navigate to={'/' + locale + '/sign-in'} />;
}

export default ProtectedRoute;
