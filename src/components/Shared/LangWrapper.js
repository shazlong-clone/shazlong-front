import React, { useEffect } from 'react';
import applyRtlCssStyles from '../../utils/applyRtlCssStyles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {changeLang} from '../../features/theme/themeSlice';
function LangWrapper({ children }) {
  const { i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  const dispatch = useDispatch();
  
  useEffect(() => {
    applyRtlCssStyles(currLang);
    dispatch(changeLang(currLang));
  }, [currLang]);
  return <>{children}</>;
}

export default LangWrapper;
