import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import { openChat } from '../../features/theme/themeSlice';

function Hero() {
  const { t, i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  const dispatch = useDispatch();
  return (
    <div
      className={clsx(
        'py-5 bg-no-repeat bg-[length:68%] md:bg-[length:60%] lg:bg-[length:65%]',
        currLang === 'ar' ? 'bg-hero-rtl bg-left-bottom' : 'bg-hero bg-right-bottom',
      )}
    >
      <div className="container">
        <div className="max-w-[400px] lg:max-w-[600px]">
          <p className="font-light text-sm">{t('Pre_Hero_Title')}</p>
          <h2 className="text-2xl mb-3  leading-8 md:text-6xl">
            <span className="font-light">{t('Talk')}</span>
            <span className="font-bold">{t('_To_Your_Therapist_Online_Privately')}</span>
            <span className="font-light">{t('_Anytime_Anywhere')}</span>
          </h2>
          <p className="text-gray/60 md:text-xl">{t('Shazlong_Number1')}</p>
        </div>
        <section className="mt-16 mb-5 flex flex-col gap-4 md:mb-32">
          <Link to={`/${i18n.resolvedLanguage}/therapists`}>
            <Button appearance="primary" className="w-[200px] lg:w-[400px] text-sm lg:text-xl">
              {t('Explore_Our_Therapists')}
            </Button>
          </Link>
          <Button onClick={()=>{
            dispatch(openChat())
          }} appearance="ghost" className="w-[200px] lg:w-[400px] text-sm lg:text-xl">
            {t('Contact')}
          </Button>
        </section>
      </div>
    </div>
  );
}

export default Hero;
