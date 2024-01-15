import React, { useEffect } from 'react';
import applyRtlCssStyles from '../../utils/applyRtlCssStyles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changeLang } from '../../features/theme/themeSlice';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import 'moment/locale/ar';
import 'moment/locale/en-au';
import moment from 'moment';

function LangWrapper({ children }) {
  const { switcher, themes } = useThemeSwitcher();
  const { i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  if (currLang) {
    moment.locale(currLang);
  }
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    switcher({ theme: currLang === 'en' ? themes.ltr : themes.rtl });
  };
  useEffect(() => {
    applyRtlCssStyles(currLang);
    dispatch(changeLang(currLang));

    toggleDarkMode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLang]);

  return <>{children}</>;
}

export default LangWrapper;
