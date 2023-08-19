import React, { useEffect } from 'react';
import applyRtlCssStyles from '../../utils/applyRtlCssStyles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changeLang } from '../../features/theme/themeSlice';
import { useThemeSwitcher } from 'react-css-theme-switcher';

function LangWrapper({ children }) {
  const { switcher, themes, status } = useThemeSwitcher();
  const { i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    switcher({ theme: currLang === 'en' ? themes.ltr : themes.rtl });
  };
  useEffect(() => {
    applyRtlCssStyles(currLang);
    dispatch(changeLang(currLang));

    toggleDarkMode();
  }, [currLang]);

  return <>{children}</>;
}

export default LangWrapper;
