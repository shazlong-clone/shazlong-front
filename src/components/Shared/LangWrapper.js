import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changeLang } from '../../features/theme/themeSlice';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import 'moment/locale/ar';
import 'moment/locale/en-au';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import arEG from 'rsuite/locales/ar_EG';
import enUS from 'rsuite/locales/en_US';
import { CustomProvider } from 'rsuite';

function LangWrapper({ children }) {
  const navigate = useNavigate();
  const { switcher, themes } = useThemeSwitcher();
  const { i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  if (currLang) {
    moment.locale(currLang);
  }

  const locale = currLang === 'ar' ? arEG : enUS;

  const dispatch = useDispatch();
  const toggleCssDirectionStyles = () => {
    switcher({ theme: currLang === 'en' ? themes.ltr : themes.rtl });
  };

  const changePath = () => {
    let locationPath = location.pathname?.split('/');
    locationPath[1] = currLang;
    locationPath = locationPath.join('/') + location.search ?? '';
    navigate(locationPath);
  };
  const applyDomDirStyles = () => {
    const root = document.getElementById('root');
    if (!currLang) return;
    if (currLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      root.style.fontSize = '20px';
      root.style.fontFamily = 'Tajawal';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      root.style.fontSize = '16px';
      root.style.fontFamily = 'Montserrat';
    }
  };

  useEffect(() => {
    dispatch(changeLang(currLang));
    applyDomDirStyles();
    toggleCssDirectionStyles();
    changePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLang]);

  return (
    <>
      <CustomProvider theme="light" rtl={currLang === 'ar' ? true : false} locale={locale}>
        {children}
      </CustomProvider>
    </>
  );
}

export default LangWrapper;
