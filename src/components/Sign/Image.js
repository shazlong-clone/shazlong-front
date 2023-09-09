import React from 'react';
import road from '../../assets/images/road-bg.jpg';
import { useTranslation } from 'react-i18next';
function Image() {
  const { t } = useTranslation();
  return (
    <>
      <main className="relative">
        <img className="max-w-full w-full  lg:h-full lg:max-h-[100vh] object-cover" src={road} alt="undraw_sign_up" />
        <article className="absolute top-0 left-0 bg-gray/20 h-full w-full text-white text-center">
          <h1 className="flex items-center h-full justify-center lg:max-w-lg lg:m-auto xl:w-full">{t('Journy')} </h1>
        </article>
      </main>
    </>
  );
}

export default Image;
