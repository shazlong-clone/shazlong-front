import React, { useEffect } from 'react';
import { Avatar, Badge, Button, Rate, Stack } from 'rsuite';

import { BsPersonSquare } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import { GiCash } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../features/shared/sharedActions';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import personImg from '../../assets/images/person.png';
import { getPrefix } from '../../features/shared/sharedActions';
function TherapistsCard() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { doctors, specializationList, prefixesList } = useSelector((state) => state?.shared);
  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getPrefix());
  }, []);

  return (
    <>
      <main className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2 font-[500]">
        {doctors?.result?.map((el) => {
          const prefix = prefixesList?.find((pref) => pref?.id === el?.prefix);
          return (
            <section key={Math.random()} className="bg-white rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0 overflow-hidden">
              <div className="flex gap-5">
                <Link to={`/thearpist-profile/${el?.id}`}>
                  <Badge color="green">
                    <Avatar
                      className="avatar-doctor-card"
                      size="lg"
                      circle={true}
                      src={el.photo ? el.photo : personImg}
                      alt="@superman66"
                    />
                  </Badge>
                </Link>
                <article className="grow">
                  <p className="text-lg">{i18n.resolvedLanguage === 'ar' ? el?.fullArName : el?.fullEnName}</p>
                  <div className="flex justify-between text-xs my-1 text-cyan">
                    <section className="text-md">{i18n.resolvedLanguage === 'ar' ? prefix?.ar_name : prefix?.name}</section>
                    <section>
                      <BsPersonSquare /> <span>{el?.sessions}+</span>
                      <span>Sessions</span>
                    </section>
                  </div>
                  <Rate readOnly size="xs" defaultValue={el?.avgReviews} />
                  <div className="text-xs">
                    {el?.avgReviews}({el?.nReviews} Reviews)
                  </div>
                </article>
              </div>
              <p className="my-2 font-[500]">Interests:</p>
              <div className="flex gap-2 items-start">
                {!el?.specialization?.length
                  ? 'no Interstes Found'
                  : el?.specialization?.slice(0, 2)?.map((id) => {
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
              <div className="my-2 flex items-center gap-1">
                <i className="text-xl text-cyan flex items-center">
                  <GiAlarmClock />
                </i>
                <span>
                  Nearest session :
                  {moment(el?.nearestSlot?.from).isValid() && el?.nearestSlot?.from
                    ? moment(el?.nearestSlot?.from).format('dddd, MMM. D [at] h:mm A')
                    : 'No Slots Found'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <i className="text-xl text-cyan flex items-center">
                  <GiCash />
                </i>
                {!el?.feez?.length
                  ? 'no feez found'
                  : el?.feez?.map((el) => {
                      return (
                        <>
                          <span className="text-cyan font-bold"> EGP {el?.amount} </span>
                          <span>/ {el?.duration} mins </span>
                        </>
                      );
                    })}
              </div>
              <div className="mt-5 lg:mt-10">
                <Stack justifyContent="center" spacing={10}>
                  <Link to={`/thearpist-profile/${el?.id}`} className="block active:no-underline hover:no-underline">
                    View Profile
                  </Link>
                  <Button size="lg" appearance="primary" block>
                    Book Now
                  </Button>
                </Stack>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}

export default TherapistsCard;
