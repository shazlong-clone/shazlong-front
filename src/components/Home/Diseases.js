import React, { useEffect } from 'react';
import Header from '../Shared/Header';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialization } from '../../features/shared/sharedActions';
import { PiSmileySadDuotone } from 'react-icons/pi';
import { TbMoodSadDizzy } from 'react-icons/tb';
import { PiMaskSadDuotone } from 'react-icons/pi';
import { BiSolidGroup } from 'react-icons/bi';
import { GiMedicalDrip } from 'react-icons/gi';

import { GiMedicalThermometer } from 'react-icons/gi';
import { FaSuitcaseMedical } from 'react-icons/fa6';
import { FaHandHoldingMedical } from 'react-icons/fa6';
import { MdOutlinePsychology } from 'react-icons/md';
import { GiPsychicWaves } from 'react-icons/gi';
import { MdPsychologyAlt } from 'react-icons/md';
import { GiChemicalDrop } from 'react-icons/gi';
import { SlChemistry } from 'react-icons/sl';
import { GiChemicalArrow } from 'react-icons/gi';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { BsPersonWorkspace } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Diseases() {
  // eslint-disable-next-line react/jsx-key
  const icons = [
    {
      icon: <PiSmileySadDuotone />,
    },
    {
      icon: <TbMoodSadDizzy />,
    },
    {
      icon: <PiMaskSadDuotone />,
    },
    {
      icon: <BiSolidGroup />,
    },
    {
      icon: <GiMedicalDrip />,
    },
    {
      icon: <GiMedicalThermometer />,
    },
    {
      icon: <FaSuitcaseMedical />,
    },
    {
      icon: <FaHandHoldingMedical />,
    },
    {
      icon: <MdOutlinePsychology />,
    },
    {
      icon: <GiPsychicWaves />,
    },
    {
      icon: <MdPsychologyAlt />,
    },
    {
      icon: <GiChemicalDrop />,
    },
    {
      icon: <SlChemistry />,
    },
    {
      icon: <GiChemicalArrow />,
    },
    {
      icon: <MdOutlineFamilyRestroom />,
    },
    {
      icon: <BsPersonWorkspace />,
    },
  ];
  const { t, i18n } = useTranslation();
  const loacle = i18n.resolvedLanguage;
  const specializationList = useSelector((state) => state?.shared?.specializationList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecialization());
  }, []);

  return (
    <div>
      <Header>{t('We_Connect_You_With_Licensed_Therapists')}</Header>
      <p className="text-center text-[var(--rs-primary-700)] mb-5 lg:text-lg">{t('Select_Specialty')}</p>
      <section className="flex flex-wrap gap-5">
        {specializationList?.map((el, i) => {
          return (
            <button
              onClick={() => navigate('/therapists')}
              key={i}
              className="active:bg-[var(--rs-gray-50)] flex-[1_1_40%] md:flex-[1_1_30%] lg:flex-[1_1_20%] flex text-lg items-center bg-[var(--rs-bg-card)] p-2 lg:p-5 rounded-xl gap-3 justify-center text-[var(--rs-primary-400)] cursor-pointer shadow-lg shadow-[var(--rs-gray-200)] mt-4 hover:bg-[var(--rs-gray-200)] transition"
            >
              <section className="text-3xl font-bold">{icons[i]?.icon}</section>
              <section>{loacle === 'ar' ? el?.ar_name : el?.name}</section>
            </button>
          );
        })}
      </section>
    </div>
  );
}

export default Diseases;
