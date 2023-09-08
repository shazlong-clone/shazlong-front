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
      header: 'Client history',
      body: ' Access all your client previous prescriptions, so you can give them better help ',
    },
    {
      image_path: lock,
      header: 'Private and Safe',
      body: ' Shezlong is 100% private and secured. ',
    },
    {
      image_path: note,
      header: 'Recorded Notes',
      body: ' Securely keep notes and medical reports for your clients. ',
    },
  ];

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
            'h-[460px] bg-gradient-to-r from-cyan to-transparent  text-white px-5 lg:px-16',
            i18n.resolvedLanguage === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r',
          )}
        >
          <h3 className="pt-[50px]  lg:max-w-xl lg:text-4xl lg:mb-10">{t('Join_Shezlong_now')}</h3>
          <p className="text-gray/70 lg:leading-9 text-[16px] mb-12 lg:max-w-xl lg:text-xl lg:mb-15">
            {t('Join_Shzlong_now_body')}
          </p>
          <Link to="/doctor-signup">
            <Button className="rounded-full font-bold">{t('Join_As_A_Therapist')}</Button>
          </Link>
        </section>
      </div>
      <div className="bg-cyan/5">
        <main className="container">
          <h4 className="text-center pt-10">{t('What_Shezlong_offers_you')}</h4>
          <div className="w-[100px] h-[2px] mx-auto mt-2 mb-10 bg-cyan " />
          <section className="lg:grid lg:grid-cols-3 lg:gap-8">
            {data?.map((el) => {
              return (
                <article key={Math.random()} className="flex bg-white rounded-sm mb-5">
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
              How to join Shezlong <br />
              therapists’ team ? <div className="w-[100px] h-[2px] mt-2 mb-10 bg-cyan " />
              <article className="pb-24 hidden lg:block">
                <Link to="/doctor-signup">
                  <Button appearance="primary" className="rounded-full font-bold">
                    Join Shezlong now
                  </Button>
                </Link>
              </article>
            </h4>
            <Timeline className="custom-timeline pb-10">
              <Timeline.Item dot={<GiClick />}>
                <strong>Registration</strong>
                <p> Click on join Shezlong now. </p>
              </Timeline.Item>
              <Timeline.Item dot={<TextImageIcon />}>
                <strong>CV</strong>
                <p>upload your own C.V.</p>
              </Timeline.Item>
              <Timeline.Item dot={<UserBadgeIcon />}>
                <strong>Profile</strong>
                <p> Complete your profile </p>
              </Timeline.Item>
              <Timeline.Item dot={<CalendarIcon />}>
                <strong>Slots</strong>
                <p> Add time slots to run sessions. </p>
              </Timeline.Item>
              <Timeline.Item dot={<CheckIcon />}>
                <strong>End</strong>
                <p>Congratuation You Have Joined Us</p>
              </Timeline.Item>
            </Timeline>
            <article className="text-center pb-24 lg:hidden">
              <Link to="/doctor-signup">
                <Button appearance="primary" className="rounded-full font-bold">
                  Join Shezlong now
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
