import React from 'react';
import Header from '../Shared/Header';
import therapist from '../../assets/images/therapist.png';
import { useTranslation } from 'react-i18next';
function OurTherapist() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="bg-cyan/20 py-1">
        <Header>{t('Meet_Our_Therapists')}</Header>
        <img src={therapist} alt="therapist" className="w-[95%] lg:w-[80%] xl:w-[50%] mb-24 m-auto block" />
      </div>
    </div>
  );
}

export default OurTherapist;
