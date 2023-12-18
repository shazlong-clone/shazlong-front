import React, { useEffect } from 'react';
import Header from '../Shared/Header';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialization } from '../../features/shared/sharedActions';
function Diseases() {
  const { t, i18n } = useTranslation();
  const loacle = i18n.resolvedLanguage;
  const specializationList = useSelector((state) => state?.shared?.specializationList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecialization());
  }, []);

  return (
    <div>
      <Header>{t('We_Connect_You_With_Licensed_Therapists')}</Header>
      <p className="text-center text-cyan/90 mb-5 lg:text-lg">{t('Select_Specialty')}</p>
      <section className="flex flex-wrap gap-5">
        {specializationList?.map((el) => {
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
