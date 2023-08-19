import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header';
import { useTranslation } from 'react-i18next';
function Diseases() {
  const { t, i18n } = useTranslation();
  const loacle = i18n.resolvedLanguage;
  const [specilties, setSpecialties] = useState([]);
  useEffect(() => {
    fetch('/api/specialty.json').then((res) => {
      res.json().then((data) => {
        setSpecialties(data);
      });
    });
  }, []);

  return (
    <div>
      <Header>{t('We_Connect_You_With_Licensed_Therapists')}</Header>
      <p className="text-center text-cyan/90 mb-5 lg:text-lg">{t('Select_Specialty')}</p>
      <section className="flex flex-wrap gap-5">
        {specilties?.map((el) => {
          return (
            <button
              key={Math.random()}
              className="flex-[1_1_40%] md:flex-[1_1_30%] lg:flex-[1_1_20%] flex text-lg items-center bg-white p-5 rounded-xl gap-3 justify-center text-cyan/90 cursor-pointer shadow-lg shadow-gray/10 mt-4 hover:bg-gray/5 transition"
            >
              <section className="text-3xl font-bold">{el?.icon}</section>
              <section>{loacle === 'ar' ? el?.ar_name : el?.name}</section>
            </button>
          );
        })}
      </section>
    </div>
  );
}

export default Diseases;
