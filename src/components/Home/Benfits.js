import React from 'react';
import Header from '../Shared/Header';
import benfit1 from '../../assets/images/benfit1.png';
import benfit2 from '../../assets/images/benfit2.png';
import benfit3 from '../../assets/images/benfit3.png';
import { useTranslation } from 'react-i18next';

function Benfits() {
  const { t } = useTranslation();
  const benfits = [
    {
      titile: t('Save_Time_And_Effort'),
      body: t('Save_Time_And_Effort_Body'),
      img: benfit1,
    },
    {
      titile: t('Responsive_Team'),
      body: t('Responsive_Team_Body'),
      img: benfit2,
    },
    {
      titile: t('Variety_Of_Options'),
      body: t('Variety_Of_Options_Body'),
      img: benfit3,
    },
  ];
  return (
    <div>
      <Header>{t('Benefit_From')}</Header>
      <div>
        <section className="lg:flex gap-5">
          {benfits?.map((el) => {
            return (
              <div key={el?.titile} className="bg-[var(--rs-bg-card)] my-16 rounded-2xl p-6 shadow-xl lg:flex-[1_1_30%]">
                <article key={el?.titile} className="flex justify-between relative">
                  <h5 className="text-cyan/80 mb-3">{el?.titile}</h5>
                  <img src={el?.img} alt={el?.titile} className="absolute top-[-70px] right-0 w-20" />
                </article>
                <section>{el?.body}</section>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Benfits;
