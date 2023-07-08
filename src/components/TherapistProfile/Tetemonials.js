import React from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import { Rate } from 'rsuite';

import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
import Card from '../Shared/Card';

const data = [
  {
    to: 'Mohamed Rashad',
    stars: 4.5,
    time: 'a Day ago',
    message: '  Thanks Dr. Basmaaaaaa 🥰  ',
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
      className={clsx(
        'text-green text-3xl top-[50%] absolute right-[-30px] translate-y-[-40%] cursor-pointer'
      )}
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
        'text-green text-3xl top-[50%] absolute left-[-30px] translate-y-[-40%] cursor-pointer z-[5]'
      )}
      onClick={onClick}
    >
      <BsFillArrowLeftCircleFill />
    </div>
  );
}

function Tetemonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className='therapist-profile'>
      <Card className='pb-12 mb-5'>
        <section className='text-3xl text-cyan/20'>
          <FaQuoteLeft />
        </section>
        <Slider {...settings}>
          {data?.map((el) => {
            return (
              <div key={el?.message}>
                <section>{el?.message}</section>
                <section className='flex justify-between items-center mt-5'>
                  <article>
                    <span>sae...</span>{' '}
                    <Rate size='xs' defaultValue={3} readOnly />
                  </article>
                  <article className='text-gray/60 font-light'>
                    aday ago
                  </article>
                </section>
              </div>
            );
          })}
        </Slider>
      </Card>
    </div>
  );
}

export default Tetemonials;
