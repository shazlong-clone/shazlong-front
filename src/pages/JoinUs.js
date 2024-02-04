import React, { useEffect } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import { Button, Timeline } from 'rsuite';
import { Link } from 'react-router-dom';
import earth from '../assets/images/earth.png';
import chat from '../assets/images/chat.png';
import folder from '../assets/images/folder.png';
import location from '../assets/images/location.png';
import lock from '../assets/images/lock.png';
import note from '../assets/images/note.png';
import CheckIcon from '@rsuite/icons/legacy/Check';
import CalendarIcon from '@rsuite/icons/Calendar';
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import TextImageIcon from '@rsuite/icons/TextImage';
import { GiClick } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

function JoinUs() {
  const { t, i18n } = useTranslation();

  const data = [
    {
      image_path: location,
      header: t('Online_Sessions'),
      body: t('Online_Sessions_Body'),
    },
    {
      image_path: earth,
      header: t('Universal_Therapy'),
      body: t('Universal_Therapy_Body'),
    },
    {
      image_path: chat,
      header: t('Better_Communication'),
      body: t('Better_Communication_Body'),
    },
    {
      image_path: folder,
      header: t('Client_history'),
      body: t('Client_history_Body'),
    },
    {
      image_path: lock,
      header: t('Private_and_Safe'),
      body: t('Private_and_Safe_Body'),
    },
    {
      image_path: note,
      header: t('Recorded_Notes'),
      body: t('Recorded_Notes_Body'),
    },
  ];

  const { doctor } = useSelector((state) => state?.auth);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <div className="container">
        <InternalHeader className="mb-5">{t('Join_Us')}</InternalHeader>
      </div>
      <div
        className="bg-no-repeat bg-right bg-cover"
        style={{
          backgroundImage: `url(/img/join-cover${i18n.resolvedLanguage === 'ar' ? '-ar' : ''}.png)`,
        }}
      >
        <section
          className={clsx(
            'h-[460px] from-[var(--rs-primary-700)] to-transparent  text-white px-5 lg:px-16',
            i18n.resolvedLanguage === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r',
          )}
        >
          <h3 className="pt-[50px]  lg:max-w-xl lg:text-4xl lg:mb-10">{t('Join_Shezlong_now')}</h3>
          <p className="text-gray/70 lg:leading-9 text-[16px] mb-12 lg:max-w-xl lg:text-xl lg:mb-15">
            {t('Join_Shzlong_now_body')}
          </p>
          {doctor?._id ? (
            <Link to="/doctor">
              <Button className="rounded-full font-bold">{t('Join_As_A_Therapist')}</Button>
            </Link>
          ) : (
            <Link to="/doctor-signup">
              <Button className="rounded-full font-bold">{t('Join_As_A_Therapist')}</Button>
            </Link>
          )}
        </section>
      </div>
      <div className="bg-[var(--rs-primary-700)]/5">
        <main className="container">
          <h4 className="text-center pt-10">{t('What_Shezlong_offers_you')}</h4>
          <div className="w-[100px] h-[2px] mx-auto mt-2 mb-10 bg-[var(--rs-primary-700)] " />
          <section className="lg:grid lg:grid-cols-3 lg:gap-8">
            {data?.map((el) => {
              return (
                <article key={Math.random()} className="flex bg-[var(--rs-bg-card)] rounded-sm mb-5">
                  <img src={el?.image_path} className="max-h-[120px]" alt="" />
                  <aside className="py-5 px-3 font-[500] text-[16px] ">
                    <h5 className="mb-5">{el?.header}</h5>
                    <p>{el?.body}</p>
                  </aside>
                </article>
              );
            })}
          </section>
          <section className="lg:flex lg:gap-10 lg:mt-20 lg:justify-center">
            <h4>
              {t('How_to_join_Shezlong')}
              <br />
              {t('therapists_team')} <div className="w-[100px] h-[2px] mt-2 mb-10 bg-[var(--rs-primary-700)] " />
              <article className="pb-24 hidden lg:block">
                <Link to="/doctor-signup">
                  <Button appearance="primary" className="rounded-full font-bold">
                    {t('Join_Now')}
                  </Button>
                </Link>
              </article>
            </h4>
            <Timeline className="custom-timeline pb-10">
              <Timeline.Item className="rtl:pr-9" dot={<GiClick />}>
                <strong>{t('Registration')}</strong>
                <p> {t('Registration_Desc')} </p>
              </Timeline.Item>
              <Timeline.Item className="rtl:pr-9" dot={<TextImageIcon />}>
                <strong>{t('CV')}</strong>
                <p>{t('CV_Desc')}</p>
              </Timeline.Item>
              <Timeline.Item className="rtl:pr-9" dot={<UserBadgeIcon />}>
                <strong>{t('Profile')}</strong>
                <p>{t('Profile_Desc')} </p>
              </Timeline.Item>
              <Timeline.Item className="rtl:pr-9" dot={<CalendarIcon />}>
                <strong>{t('Slots')}</strong>
                <p>{t('Slots_Desc')}</p>
              </Timeline.Item>
              <Timeline.Item className="rtl:pr-9" dot={<CheckIcon />}>
                <strong>{t('End')}</strong>
                <p>{t('End_Desc')}</p>
              </Timeline.Item>
            </Timeline>
            <article className="text-center pb-24 lg:hidden">
              <Link to="/doctor-signup">
                <Button appearance="primary" className="rounded-full font-bold">
                  {t('Join_Now')}
                </Button>
              </Link>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

export default JoinUs;
