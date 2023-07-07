import React from 'react';
import { CiFaceSmile } from 'react-icons/ci';
import Header from '../Shared/Header';
import { useTranslation } from 'react-i18next';
const diseases = [
  {
    name: 'Depressed',
    icon: <CiFaceSmile />,
  },
  {
    name: 'Depressed',
    icon: <CiFaceSmile />,
  },
  {
    name: 'Depressed',
    icon: <CiFaceSmile />,
  },
  {
    name: 'Depressed',
    icon: <CiFaceSmile />,
  },
];
function Diseases() {
  const { t } = useTranslation();
  return (
    <div>
      <Header>{t('We_Connect_You_With_Licensed_Therapists')}</Header>
      <p className='text-center text-cyan/90 text-sm'>
        Select the speciality that fits your need.
      </p>
      <section className='flex flex-wrap gap-5'>
        {diseases?.map((el) => {
          
          return (
            <button key={Math.random()} className='flex-[1_1_40%] md:flex-[1_1_30%] lg:flex-[1_1_20%] flex items-center bg-white p-5 rounded-xl gap-3 justify-center text-cyan/90 cursor-pointer shadow-lg shadow-gray/10 mt-4'>
              <section className='text-3xl font-bold'>{el?.icon}</section>
              <section>{el?.name}</section>
            </button>
          );
        })}
      </section>
    </div>
  );
}

export default Diseases;
