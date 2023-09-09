import React from 'react';
import join from '../../assets/images/join-half-cover..png';
import { useTranslation } from 'react-i18next';
function Image() {
  const { t } = useTranslation();
  return (
    <>
      <main className="relative hidden lg:block">
        <img
          className="max-w-full  w-full  lg:h-screen lg:max-h-[100vh] object-cover object-right"
          src={join}
          alt="undraw_sign_up"
        />
        <article className="absolute top-0 left-0 bg-gray/20 h-full w-full text-white text-center">
          <h1 className="flex items-center h-full justify-center lg:max-w-lg lg:m-auto xl:w-full">{t('Journy')}</h1>
        </article>
      </main>
    </>
  );
}

export default Image;
