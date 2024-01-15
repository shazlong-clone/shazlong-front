import React, { memo } from 'react';
import { Avatar, Badge, Button, Rate, Stack, useMediaQuery } from 'rsuite';

import { BsPersonSquare } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import { GiCash } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import personImg from '../../assets/images/person.png';
import clsx from 'clsx';
import { IoMdMale } from 'react-icons/io';
import { IoMdFemale } from 'react-icons/io';

function DoctorCard({ doctor }) {
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery(['md']);
  const { specializationList, prefixesList, countries, languages } = useSelector((state) => state?.shared);
  const { i18n } = useTranslation();
  const country = countries?.find((country) => country?.id === doctor?.country);
  const prefix = prefixesList?.find((pref) => pref?.id === doctor?.prefix);
  const navigate = useNavigate();
  return (
    <section key={Math.random()} className="bg-[var(--rs-bg-card)] rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0 overflow-hidden">
      <div className="flex gap-5">
        <Link to={`/thearpist-profile/${doctor?.id}`}>
          <span className={clsx('custom-badge', doctor?.isOnline && 'green-bage')}>
            <Badge size="lg">
              <Avatar
                className="avatar-doctor-card"
                size="lg"
                circle={true}
                src={doctor.photo ? doctor.photo : personImg}
                alt="@superman66"
              />
            </Badge>
          </span>
        </Link>
        <article className="grow">
          <section className="flex justify-between gap-1">
            <p className="text-md lg:text-lg  min-w-fit">
              {i18n.resolvedLanguage === 'ar' ? doctor?.fullArName : doctor?.fullEnName}
            </p>
            <p className="flex gap-1 mt-0 items-center">
              <span className="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal pt-[6px]">
                {country?.country_name}
              </span>
              <span className={country?.country_flag} />
            </p>
          </section>

          <div className="flex justify-between text-xs my-1 text-cyan">
            <section className="text-md flex gap-1 items-center">
              <span>{i18n.resolvedLanguage === 'ar' ? prefix?.ar_name : prefix?.name}</span>
              <span className="text-lg flex items-center">{doctor?.gender === 1 ? <IoMdFemale /> : <IoMdMale />}</span>
            </section>
            <section>
              <BsPersonSquare /> <span>{doctor?.sessions}+</span>
              <span>Sessions</span>
            </section>
          </div>
          <Rate readOnly size="xs" defaultValue={doctor?.avgReviews} />
          <div className="text-xs">
            {doctor?.avgReviews}({doctor?.nReviews} Reviews)
          </div>
        </article>
      </div>
      <p className="my-2 font-[500]">{t('Interests')}:</p>
      <div className="flex gap-2 items-start max-w-[400px]">
        {!doctor?.specialization?.length
          ? 'no Interstes Found'
          : doctor?.specialization?.slice(0, 2)?.map((id) => {
              return (
                <section
                  key={Math.random()}
                  className="
                  bg-[var(--rs-green-50)] text-[var(--rs-green-800)] rounded-xl px-3 py-1 
                  whitespace-nowrap overflow-hidden text-ellipsis 
                  hover:whitespace-normal hover:overflow-visible cursor-pointer
                  text-[12px] lg:text-md
                  "
                >
                  {i18n.resolvedLanguage === 'ar'
                    ? specializationList?.find((spec) => spec?.id === id)?.ar_name
                    : specializationList?.find((spec) => spec?.id === id)?.name}
                </section>
              );
            })}
      </div>
      <div className="mt-4">
        <section className="flex gap-2 flex-wrap mx-2 items-center">
          {t('Languages')} :
          {doctor?.languages?.map((langId) => {
            const langItem = languages?.find((lg) => lg?.id === langId);
            return (
              <span key={langId} className=" px-1 rounded-md bg-[var(--rs-gray-100)]">
                {i18n.resolvedLanguage === 'ar' ? langItem?.ar_name : langItem?.name}
              </span>
            );
          })}
        </section>
      </div>
      <div className="my-2 flex items-center gap-1">
        <i className="text-xl text-cyan flex items-center">
          <GiAlarmClock />
        </i>
        <span>
          {t('Nearest_Session')}: &nbsp;
          {moment(doctor?.nearestSlot?.from).isValid() && doctor?.nearestSlot?.from
            ? moment(doctor?.nearestSlot?.from).format('dddd, MMM. D [at] h:mm A')?.replace('at', t('At_Hour'))
            : t('No_Nearst_Sessions')}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <i className="text-xl text-cyan flex items-center">
          <GiCash />
        </i>
        {!doctor?.feez?.length
          ? 'no feez found'
          : doctor?.feez?.map((feezItem) => {
              return (
                <>
                  <span className="text-cyan font-bold"> EGP {feezItem?.amount} </span>
                  <span>/ {feezItem?.duration} mins </span>
                </>
              );
            })}
      </div>
      <div className="mt-5 lg:mt-10">
        <Stack justifyContent="flex-end" spacing={10}>
          <Button
            onClick={() => navigate(`/thearpist-profile/${doctor?.id}`)}
            size={isMobile ? 'md' : 'sm'}
            appearance="ghost"
            block
          >
            {t('View_Profile')}
          </Button>
          <Button
            onClick={() => navigate(`/thearpist-profile/${doctor?.id}`)}
            size={isMobile ? 'md' : 'sm'}
            appearance="primary"
            block
          >
            {t('Book_Now')}
          </Button>
        </Stack>
      </div>
    </section>
  );
}

export default memo(DoctorCard);
