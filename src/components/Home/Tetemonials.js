import React from 'react';
import Header from '../Shared/Header';
import Slider from 'react-slick';
import clsx from 'clsx';
import { Rate } from 'rsuite';

import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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
      className={clsx('text-[var(--rs-green-400)] text-3xl top-[50%] absolute left-[-30px] translate-y-[-40%] cursor-pointer z-[5]')}
      onClick={onClick}
    >
      <BsFillArrowLeftCircleFill />
    </div>
  );
}

function Tetemonials() {
  const { t } = useTranslation();
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="home-testimonial">
      <Header>{t('What_Our_Clients_Are_Saying')}</Header>
      <div className="px-3">
        <Slider {...settings}>
          {data?.map((el) => {
            return (
              <div key={el?.message} className="bg-[var(--rs-bg-card)] rounded-lg p-6 shadow-md">
                <article className="flex justify-between mb-5">
                  <section className="flex gap-3 items-center">
                    <div className="text-3xl text-cyan/20 flex justify-center items-center">
                      <FaQuoteLeft />
                    </div>
                    <div>
                      <div>
                        To{' '}
                        <a className="text-[var(--rs-green-900)] cursor-pointer" href="/">
                          {el?.to}
                        </a>
                      </div>
                      <div>
                        <Rate color='yellow' defaultValue={3.5} size="xs" readOnly />
                      </div>
                    </div>
                  </section>
                  <section className="text-gray/60 font-light word-">aday ago</section>
                </article>
                <article>{el?.message}</article>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Tetemonials;
