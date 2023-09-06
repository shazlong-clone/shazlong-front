import arEG from 'rsuite/locales/ar_EG';
import enUS from 'rsuite/locales/en_US';

import React from 'react';
import { useSelector } from 'react-redux';
import { CustomProvider } from 'rsuite';

function LocalizeRsuit({ children }) {
  const lang = useSelector((state) => state?.theme?.locale);
  const locale = lang === 'ar' ? arEG : enUS;
  return <CustomProvider rtl={lang === 'ar' ? true  : false} locale={locale}>{children}</CustomProvider>;
}

export default LocalizeRsuit;
