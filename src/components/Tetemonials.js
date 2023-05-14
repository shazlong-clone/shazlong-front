import React from 'react';
import Header from './Header';
import Slider from 'react-slick';
import clsx from 'clsx';
import { Rate } from 'rsuite';

import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import {FaQuoteLeft} from 'react-icons/fa'

const data = [
  {
    to:'Mohamed Rashad',
    stars:4.5,
    time: 'a Day ago',
    message: " I feel better after every session, the doctor is really helpful and understanding  "
  },
  {
    to:'Saeed Khaled',
    stars:4.5,
    time: '2 Days ago',
    message: "  first session, it was good 🤍   "
  },
  {
    to:'Saeed Khaled',
    stars:4.5,
    time: '2 Days ago',
    message: "  first session, it was good 🤍   "
  },
  {
    to:'Saeed Khaled',
    stars:4.5,
    time: '2 Days ago',
    message: "  first session, it was good 🤍   "
  },
  {
    to:'Saeed Khaled',
    stars:4.5,
    time: '2 Days ago',
    message: "  first session, it was good 🤍   "
  }
]
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
        'text-green text-3xl top-[50%] absolute left-[-30px] translate-y-[-40%] cursor-pointer'
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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }
      }
    ]
  };
  return (
    <div>
      <Header>What Our Clients Are Saying</Header>
      <div>
        <Slider {...settings}>
          {
            data?.map((el,i) => {
              return <div className='bg-white rounded-lg p-6 shadow-md'>
                <article className='flex justify-between mb-5'>
                  <section className='flex gap-3 items-center'>
                    <div className='text-3xl text-cyan/20 flex justify-center items-center'>
                      <FaQuoteLeft />
                    </div>
                    <div>
                      <div>To <a className='text-green cursor-pointer' href='/'>{el?.to}</a></div>
                      <div>
                        <Rate defaultValue={3.5} size="xs"  readOnly />
                      </div>
                    </div>
                  </section>
                  <section className='text-gray/60 font-light word-'>aday ago</section>
                </article>
                <article>{el?.message}</article>
              </div>
            } )
          }
        </Slider>
      </div>
    </div>
  );
}

export default Tetemonials;
