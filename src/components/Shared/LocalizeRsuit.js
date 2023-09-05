import { CustomProvider } from 'rsuite';
import arEG from 'rsuite/locales/ar_EG';
import enUS from 'rsuite/locales/en_US';

import React from 'react';
import { useSelector } from 'react-redux';

function LocalizeRsuit({ children }) {
  const lang = useSelector((state) => state?.theme?.locale);
  const locale = lang === 'ar' ? arEG : enUS;
  return <CustomProvider locale={locale}>{children}</CustomProvider>;
}

export default LocalizeRsuit;
