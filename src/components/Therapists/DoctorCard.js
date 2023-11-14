import React from 'react';
import { Avatar, Badge, Button, Rate, Stack } from 'rsuite';

import { BsPersonSquare } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import { GiCash } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import personImg from '../../assets/images/person.png';

function DoctorCard({ doctor }) {
  const { specializationList, prefixesList, countries, languages } = useSelector((state) => state?.shared);
  const { i18n } = useTranslation();

  const country = countries?.find((country) => country?.id === doctor?.country);
  const prefix = prefixesList?.find((pref) => pref?.id === doctor?.prefix);
  return (
    <section key={Math.random()} className="bg-white rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0 overflow-hidden">
      <div className="flex gap-5">
        <Link to={`/thearpist-profile/${doctor?.id}`}>
          <Badge color="green">
            <Avatar
              className="avatar-doctor-card"
              size="lg"
              circle={true}
              src={doctor.photo ? doctor.photo : personImg}
              alt="@superman66"
            />
          </Badge>
        </Link>
        <article className="grow">
          <section className="flex justify-between">
            <p className="text-lg">{i18n.resolvedLanguage === 'ar' ? doctor?.fullArName : doctor?.fullEnName}</p>
            <p className="flex gap-1">
              <span>{country?.country_name}</span>
              <span className={country?.country_flag} />
            </p>
          </section>

          <div className="flex justify-between text-xs my-1 text-cyan">
            <section className="text-md">{i18n.resolvedLanguage === 'ar' ? prefix?.ar_name : prefix?.name}</section>
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
      <p className="my-2 font-[500]">Interests:</p>
      <div className="flex gap-2 items-start flex-wrap">
        {!doctor?.specialization?.length
          ? 'no Interstes Found'
          : doctor?.specialization?.slice(0, 2)?.map((id) => {
              return (
                <section
                  key={Math.random()}
                  className="bg-green/10 text-green rounded-xl px-3 py-1 whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal hover:overflow-visible cursor-pointer"
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
          Languages :
          {doctor?.languages?.map((langId) => {
            const langItem = languages?.find((lg) => lg?.id === langId);
            return (
              <span key={langId} className=" px-1 rounded-md bg-gray/5">
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
          Nearest session :
          {moment(doctor?.nearestSlot?.from).isValid() && doctor?.nearestSlot?.from
            ? moment(doctor?.nearestSlot?.from).format('dddd, MMM. D [at] h:mm A')
            : 'No Slots Found'}
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
        <Stack justifyContent="center" spacing={10}>
          <Link to={`/thearpist-profile/${doctor?.id}`} className="block active:no-underline hover:no-underline">
            View Profile
          </Link>
          <Button size="lg" appearance="primary" block>
            Book Now
          </Button>
        </Stack>
      </div>
    </section>
  );
}

export default DoctorCard;
