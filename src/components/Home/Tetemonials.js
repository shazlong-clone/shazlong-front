import React, { useEffect } from 'react';
import Header from '../Shared/Header';
import Slider from 'react-slick';
import clsx from 'clsx';
import { Rate } from 'rsuite';

import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../features/shared/sharedActions';
import moment from 'moment';
import { Link } from 'react-router-dom';
import doctorImg from '../../assets/images/person.svg';
const data = [
  {
    to: 'Mohamed Rashad',
    stars: 4.5,
    time: 'a Day ago',
    message: ' I feel better after every session, the doctor is really helpful and understanding  ',
  },
  {
    to: 'Saeed Khaled',
    stars: 4.5,
    time: '2 Days ago',
    message: '  first session, it was good 🤍   ',
  },
  {
    to: 'Saeed Khaled',
    stars: 4.5,
    time: '2 Days ago',
    message: '  first session, it was good 🤍   ',
  },
  {
    to: 'Saeed Khaled',
    stars: 4.5,
    time: '2 Days ago',
    message: '  first session, it was good 🤍   ',
  },
  {
    to: 'Saeed Khaled',
    stars: 4.5,
    time: '2 Days ago',
    message: '  first session, it was good 🤍   ',
  },
];

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={clsx('text-[var(--rs-green-400)] text-3xl top-[50%] absolute right-[-30px] translate-y-[-40%] cursor-pointer')}
      onClick={onClick}
    >
      <BsFillArrowRightCircleFill />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={clsx(
        'text-[var(--rs-green-400)] text-3xl top-[50%] absolute left-[-30px] translate-y-[-40%] cursor-pointer z-[5]',
      )}
      onClick={onClick}
    >
      <BsFillArrowLeftCircleFill />
    </div>
  );
}

function Tetemonials() {
  const { t, i18n } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const reviews = useSelector((state) => state?.shared?.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews({ page: 1, size: 4, isActive: 1 }));
  }, []);
  return (
    <div className="home-testimonial">
      <Header>{t('What_Our_Clients_Are_Saying')}</Header>
      <div className="px-3">
        <Slider {...settings}>
          {reviews?.data?.map((review) => {
            return (
              <div key={review?.message} className="bg-[var(--rs-bg-card)] rounded-lg p-6 shadow-md">
                <article className="flex justify-between mb-5">
                  <section className="flex gap-3 items-center">
                    <div className="text-lg lg:text-3xl text-cyan/20 flex justify-center items-center">
                      <FaQuoteLeft />
                    </div>
                    <div>
                      <div className="text-base lg:text-xl flex  items-center">
                        {t('To')}
                        &nbsp;
                        <Link
                          to={`/${i18n.resolvedLanguage}/thearpist-profile/${review?.doctor?._id}`}
                          className="flex gap-1 items-center text-[var(--rs-green-500)] cursor-pointer hover:text-[var(--rs-green-900)] hover:no-underline"
                          href="/"
                        >
                          {i18n.resolvedLanguage === 'ar' ? review?.doctor?.fullArName : review?.doctor?.fullEnName}
                          <img className="size-5 rounded-full" alt="doctor img" src={review?.doctor?.photo || doctorImg} />
                        </Link>
                      </div>
                      <div>
                        <Rate color="yellow" defaultValue={3.5} size="xs" readOnly />
                      </div>
                    </div>
                  </section>
                  <section className="text-[var(--rs-gray-500)] font-light text-sm lg:text-xl">
                    {moment(review?.createdAt).isValid() ? moment(review?.createdAt)?.fromNow() : ''}
                  </section>
                </article>
                <article>{review?.message}</article>
                <article className="mt-5 text-sm text-[var(--rs-gray-500)] flex gap-2 items-center justify-end">
                  <span className="mt-1">{review?.user?.name}</span>
                  <img className="size-5 rounded-full" alt="doctor img" src={review?.user?.photo || doctorImg} />
                  <span className="mt-1">:{t('By')}</span>
                </article>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Tetemonials;
