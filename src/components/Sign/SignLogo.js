import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/shezlong-logo.svg';
import arLogo from '../../assets/images/Shezlong-Ar-Logos.png';
import { useTranslation } from 'react-i18next';

function SignLogo() {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  return (
    <>
      <div className="text-center">
        <Link to={`/${i18n.resolvedLanguage}`}>
          <img width="70%" src={locale === 'ar' ? arLogo : logo} alt="/" />
        </Link>
      </div>
    </>
  );
}

export default SignLogo;
