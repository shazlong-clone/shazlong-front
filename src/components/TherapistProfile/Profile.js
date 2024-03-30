import React, { useEffect, useMemo } from 'react';
import { Badge, Button, Rate } from 'rsuite';
import person from '../../assets/images/person.svg';
import { GiWorld } from 'react-icons/gi';
import { BsFlag } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { RiPsychotherapyLine } from 'react-icons/ri';
import Card from '../Shared/Card';
import useMediaQuery from '../../hooks/useMediaQuery';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCountries, getLangs, getPrefix, getSpecialization } from '../../features/shared/sharedActions';
import clsx from 'clsx';
import moment from 'moment';
function Profile({ setBounceBg }) {
  const lg = useMediaQuery('lg');
  const { doctorProfile, prefixesList, specializationList, languages, countries } = useSelector((state) => state?.shared);
  const { t, i18n } = useTranslation();
  const prefix = prefixesList?.find((pref) => pref?.id === doctorProfile?.prefix);
  const dispatch = useDispatch();
  const doctorCountry = useMemo(() => {
    return countries?.find((country) => country?.id === doctorProfile?.country);
  }, []);
  useEffect(() => {
    dispatch(getPrefix());
    dispatch(getSpecialization());
    dispatch(getLangs());
    dispatch(getCountries());
  }, []);
  return (
    <Card className="mb-5 lg:p-10">
      <section className="flex gap-5 lg:mb-5">
        <article>
          <span className={clsx('custom-badge profile-badge', doctorProfile?.isOnline && 'green-bage')}>
            <Badge color="green">
              <img
                className="w-[78px] h-[78px] lg:w-[100px] lg:h-[100px] rounded-full"
                alt="img"
                src={doctorProfile?.photo || person}
              />
            </Badge>
          </span>
        </article>
        <article className="grid gap-y-1">
          <h6 className="lg:text-xl">{i18n.resolvedLanguage === 'ar' ? doctorProfile?.fullArName : doctorProfile?.fullEnName}</h6>
          <h6 className="font-medium text-cyan lg:text-lg">{i18n.resolvedLanguage === 'ar' ? prefix?.ar_name : prefix?.name}</h6>
          <Rate color='yellow' defaultValue={4} readOnly size="xs" />
          <aside className="flex gap-2 items-center text-[1rem]">
            <span className="underline">({t('Reviews', { count: doctorProfile?.nReviews })})</span>
          </aside>
        </article>
      </section>
      <section className="flex gap-1 flex-wrap mt-3">
        {doctorProfile?.specialization?.map((id) => {
          const specializationItem = specializationList?.find((spec) => spec?.id === id);
          return (
            <span
              key={Math.random()}
              className="bg-[var(--rs-gray-100)] text-[var(--rs-gray-900)] mb-2 text-sm font-bold px-3 py-1 rounded-3xl text-green/60 inline-block"
            >
              {i18n.resolvedLanguage === 'ar' ? specializationItem?.ar_name : specializationItem?.name}
            </span>
          );
        })}
      </section>
      <section className="mt-3">
        <ul className="list-none p-0 text-sm grid gap-2 mt-2">
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<GiWorld />}</i>
              <aside className="text-lg">{t('Language')}:</aside>
            </span>
            <aside className="text-xs lg:text-base font-bold">
              {doctorProfile?.languages?.map((langId) => {
                const lang = languages?.find((el) => el?.id === langId);
                return <span key={lang?.id}>{i18n.resolvedLanguage === 'ar' ? lang?.ar_name : lang?.name}</span>;
              })}
            </aside>
          </li>
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<BsFlag />}</i>
              <aside className="text-lg">{t('Country')}:</aside>
            </span>
            <aside className="text-xs lg:text-base font-bold flex items-center gap-2">
              <span className="flex items-center pt-1">{doctorCountry?.country_name}</span>
              <span className={clsx(doctorCountry?.country_flag)} />
            </aside>
          </li>
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<SlCalender />}</i>
              <aside className="text-lg">{t('Join_Date')}:</aside>
            </span>
            <aside className="text-xs lg:text-base font-bold">{moment(doctorProfile?.createdAt)?.fromNow()}</aside>
          </li>
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<RiPsychotherapyLine />}</i>
              <aside className="text-lg">{t('Sessions_Num')}:</aside>
            </span>
            <aside className="text-xs lg:text-base font-bold">{t('Sessions', { count: doctorProfile?.sessions })}</aside>
          </li>
        </ul>
      </section>
      <section className="flex  justify-center gap-2 pt-5 lg:text-start" id="link1">
        <a href="#link1" className="lg:hidden">
          <Button onClick={() => setBounceBg(true)} appearance="primary" size={lg ? 'lg' : 'md'}>
            {t('Book_Session')}
          </Button>
        </a>
        <Review />
        {/* <a href="#link2" className="hidden lg:block">
          <Button onClick={() => setBounceBg(true)} appearance="ghost" size={lg ? 'lg' : 'md'}>
            {t('Book')}
          </Button>
        </a> */}
      </section>
    </Card>
  );
}

export default Profile;
