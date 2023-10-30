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

function TherapistsCard() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { doctors, specializationList } = useSelector((state) => state?.shared);
  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);

  return (
    <>
      <main className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2 font-[500]">
        {doctors?.result?.map((el) => {
          return (
            <section key={Math.random()} className="bg-white rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0">
              <div className="flex gap-5">
                <Link to={`/thearpist-profile/${el?.id}`}>
                  <Badge color="green">
                    <Avatar
                      className="avatar-doctor-card"
                      size="lg"
                      circle={true}
                      src={`data:image/jpeg;base64,${el?.photo}`}
                      alt="@superman66"
                    />
                  </Badge>
                </Link>
                <article className="grow">
                  <p>{i18n.resolvedLanguage === 'ar' ? el?.fullArName : el?.fullEnName}</p>
                  <div className="flex justify-between text-xs my-1 text-cyan">
                    <section>{el?.prefix}</section>
                    <section>
                      <BsPersonSquare /> <span>25+</span>
                      <span>Sessions</span>
                    </section>
                  </div>
                  <Rate size="xs" defaultValue={3} />
                  <div className="text-xs">5({el?.nReviews} Reviews)</div>
                </article>
              </div>
              <p className="my-2 font-[500]">Interests:</p>
              <div className="flex flex-wrap gap-2">
                {el?.specialization?.slice(0, 2)?.map((id) => {
                  return (
                    <section key={Math.random()} className="bg-green/10 text-green rounded-xl px-3 py-1">
                      {i18n.resolvedLanguage === 'ar'
                        ? specializationList?.find((el) => el?.id === id)?.ar_name
                        : specializationList?.find((el) => el?.id === id)?.name}
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
                  {moment(el?.nearestSlot?.from).isValid()
                    ? moment(el?.nearestSlot?.from).format('dddd, MMM. D [at] h:mm A')
                    : ''}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <i className="text-xl text-cyan flex items-center">
                  <GiCash />
                </i>
                {el?.feez?.map((el) => {
                  return (
                    <>
                      <span className="text-cyan font-bold"> EGP {el?.amount} </span>
                      <span>/ {el?.duration} mins </span>
                    </>
                  );
                })}
              </div>
              <div className="mt-5">
                <Stack justifyContent="space-between" spacing={10}>
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
