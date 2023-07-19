import React, { useEffect } from 'react';
import applyRtlCssStyles from '../../utils/applyRtlCssStyles';
import i18next from 'i18next';

function LangWrapper({ children }) {
  const currLang = i18next.resolvedLanguage;
  useEffect(() => {
    applyRtlCssStyles(currLang);
  }, [currLang]);
  return <>{children}</>;
}

export default LangWrapper;
