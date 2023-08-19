import React from 'react';
import Header from '../Shared/Header';
import DawnloadApp from '../../assets/images/download-app-new.webp';
import GooglePlay from '../../assets/images/google-play.svg';
import Apple from '../../assets/images/app-store.svg';
import { useTranslation } from 'react-i18next';
function Phone() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-12">
        <Header>
          {t('Download_Our_App')}
          <br />
          <div className="lg:hidden">{t('Taking_Care_Of_Mental_Health')}</div>
        </Header>
      </div>
      <div className="lg:flex gap-5">
        <section>
          <h2 className="hidden lg:block lg:text-cyan/90">{t('Taking_Care_Of_Mental_Health')}</h2>
          <p className="text-center lg:text-2xl lg:rtl:text-xl lg:text-start lg:mb-16 lg:mt-4 lg:font-light lg:rtl:font-bold lg:max-w-[500px]">
            {t('Enjoy_App')}
          </p>
          <article className="flex gap-4 my-5">
            <img src={GooglePlay} alt="GooglePlay" className="w-[40%]" />
            <img src={Apple} alt="Apple" className="w-[40%]" />
          </article>
        </section>
        <img src={DawnloadApp} alt="dawnload-app" className="w-full lg:w-[50%] md:w-[70%] m-auto block lg:h-[500px]" />
      </div>
    </div>
  );
}

export default Phone;
