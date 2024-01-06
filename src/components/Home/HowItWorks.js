import React from 'react';
import Header from '../Shared/Header';
import HIW1 from '../../assets/images/how-it-works-1.png';
import HIW2 from '../../assets/images/how-it-works-2.png';
import HIW3 from '../../assets/images/how-it-works-3.png';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

function HowItWorks() {
  const { t } = useTranslation();
  const data = [
    {
      title: t('Sign_As_Customer'),
      body: t('Sign_As_Customer_Body'),
      img: HIW1,
    },
    {
      title: t('Book_Your_Session'),
      body: t('Book_Your_Session_Body'),
      img: HIW2,
    },
    {
      title: t('Start_Your_Journey'),
      body: t('Start_Your_Journey_Body'),
      img: HIW3,
    },
  ];
  return (
    <div>
      <Header>{t('How_It_is_Works')}</Header>
      <section className="flex flex-col lg:flex-row gap-y-5 bg-[var(--rs-bg-card)] rounded-lg p-5 flex-wrap justify-center lg:gap-x-12">
        {data?.map((el, i) => {
          return (
            <article key={el?.title} className={clsx('flex gap-x-5 lg:w-[46%]')}>
              <img src={el?.img} alt={el?.title} className="h-[80px]" />
              <div>
                <h5 className="text-cyan/95 mb-2">
                  {i + 1}.{el?.title}
                </h5>
                <p className="text-gray/80 text-sm lg:text-base">{el?.body}</p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default HowItWorks;
