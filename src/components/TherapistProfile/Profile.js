import React from 'react';
import { Badge, Button, Rate } from 'rsuite';
import therapist from '../../assets/images/therapist.webp';
import { GiWorld } from 'react-icons/gi';
import { BsFlag } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { RiPsychotherapyLine } from 'react-icons/ri';
import Card from '../Shared/Card';
import useMediaQuery from '../../utils/useMediaQuery';
import Review from './Review';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
function Profile({ setBounceBg }) {
  const interstes = ['Mood disorders (depression)', 'Anxiety disorders and obsessions'];
  const lg = useMediaQuery('lg');
  const { doctorProfile, prefixesList } = useSelector((state) => state?.shared);
  const { t, i18n } = useTranslation();
  const prefix = prefixesList?.find((pref) => pref?.id === doctorProfile?.prefix);

  return (
    <Card className="mb-5 lg:p-10">
      <section className="flex gap-5 lg:mb-5">
        <article>
          <Badge color="green">
            <img
              className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] rounded-full"
              alt="img"
              src={doctorProfile?.photo || therapist}
            />
          </Badge>
        </article>
        <article className="grid gap-y-1">
          <h6 className="lg:text-xl">{i18n.resolvedLanguage === 'ar' ? doctorProfile?.fullArName : doctorProfile?.fullEnName}</h6>
          <h6 className="font-medium text-cyan lg:text-lg">{i18n.resolvedLanguage === 'ar' ? prefix?.ar_name : prefix?.name}</h6>
          <Rate defaultValue={4} readOnly size="xs" />
          <aside className="flex gap-2 items-center text-xs">
            <span className="underline">
              {doctorProfile?.avgReviews}({t('Reviews', { count: doctorProfile?.nReviews })})
            </span>
            <Button appearance="link" className="text-sm p-0">
              Write Reviews
            </Button>
          </aside>
        </article>
      </section>
      <section className="flex gap-1 flex-wrap mt-3">
        {interstes?.map((el) => {
          return (
            <span
              key={Math.random()}
              className="bg-[var(--rs-green-100)] mb-2 text-xs font-bold px-3 py-1 rounded-3xl text-green/60 inline-block"
            >
              {el}
            </span>
          );
        })}
      </section>
      <section className="mt-3">
        <ul className="list-none p-0 text-sm grid gap-2 mt-2">
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<GiWorld />}</i>
              <aside className="text-lg">Language:</aside>
            </span>
            <aside className="text-xs lg:text-base font-bold">Arabic,English</aside>
          </li>
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<BsFlag />}</i>
              <aside className="text-lg">Counary:</aside>
            </span>
            <aside className="text-xs lg:text-base font-bold">Egypt</aside>
          </li>
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<SlCalender />}</i>
              <aside className="text-lg">Join Date:</aside>
            </span>
            <aside className="text-xs lg:text-base font-bold">5 years ago</aside>
          </li>
          <li className="flex items-center gap-1">
            <span className="text-cyan flex items-center gap-3">
              <i className="flex items-center text-lg">{<RiPsychotherapyLine />}</i>
              <aside className="text-lg" id="checkout">
                Num of Sessions:
              </aside>
            </span>
            <aside className="text-xs lg:text-base font-bold">1000+ session</aside>
          </li>
        </ul>
      </section>
      <section className="flex lg:block justify-center gap-2 mt-5 lg:text-start">
        <Review />
        <a href="#checkout" className="lg:hidden">
          <Button onClick={() => setBounceBg(true)} appearance="primary" size={lg ? 'lg' : 'md'}>
            Book
          </Button>
        </a>
      </section>
    </Card>
  );
}

export default Profile;
