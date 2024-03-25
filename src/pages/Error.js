import React from 'react';
import notFound from '../assets/images/undraw_page_not_found.svg';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Error() {
  const { t, i18n } = useTranslation();
  return (
    <div className="text-center">
      <img className="my-10 max-w-full" alt="not found" src={notFound} />
      <br />
      <p>{t('page_not_found')}</p>
      <Link to={`/${i18n.resolvedLanguage}`}>
        <Button className="my-6" appearance="primary">
          {t('back_to_home')}
        </Button>
      </Link>
    </div>
  );
}

export default Error;
