import React from 'react';
import Card from '../Shared/Card';
import Slider from 'react-slick';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RxDotFilled } from 'react-icons/rx';
function Booking() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const doctorSlots = [
    {
      date: 'Sat 08',
      slots: [
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: false,
          isSelected: true,
        },
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: false,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: true,
        },
      ],
    },
    {
      date: 'Sat 08',
      slots: [
        {
          h: '02:00 PM',
          isBooked: false,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: false,
          isSelected: true,
        },
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: true,
        },
      ],
    },
    {
      date: 'Sat 08',
      slots: [
        {
          h: '02:00 PM',
          isBooked: false,
          isSelected: false,
        },
        {
          h: '02:00 PM',
          isBooked: true,
          isSelected: false,
        },
      ],
    },
  ];
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={clsx(
          'text-cyan text-3xl top-[50%] absolute right-[-30px] translate-y-[-40%] cursor-pointer'
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
          'text-cyan text-3xl top-[50%] absolute left-[-30px] translate-y-[-40%] cursor-pointer z-[5]'
        )}
        onClick={onClick}
      >
        <BsFillArrowLeftCircleFill />
      </div>
    );
  }
  return (
    <Card>
      <h5 className='text-center mb-4'>Book Session</h5>
      <Slider {...settings}>
        {doctorSlots.map((el, i) => {
          return (
            <div
              key={Math.random()}
              className='bg-cyan/5 border border-solid border-white text-center rounded-lg'
            >
              <section className='text-white bg-cyan rounded-t-lg py-1 font-bold'>
                Sat 08
              </section>
              <section className='grid my-2 gap-2'>
                {el?.slots.map((slot) => {
                  return (
                    <aside>
                      <span
                        className={twMerge(
                          clsx(
                            'bg-gray/10 p-1 text-xs font-[600] rounded-md px-2 cursor-pointer',
                            slot?.isBooked
                              ? 'border border-solid border-red-400 text-red-400 bg-red-50 line-through'
                              : slot?.isSelected
                              ? 'border border-solid border-green text-green bg-green/10'
                              : ''
                          )
                        )}
                      >
                        {slot?.h}
                      </span>
                    </aside>
                  );
                })}
              </section>
            </div>
          );
        })}
      </Slider>
      <section className='flex text-center gap-4 text-xs justify-center mt-5'>
        <article className='flex items-center'>
          <RxDotFilled className='text-gray/25 text-2xl flex items-center' />
          <span>Available</span>
        </article>
        <article className='flex items-center'>
          <RxDotFilled className='text-green text-2xl flex items-center' />
          <span>Seleced</span>
        </article>
        <article className='flex items-center'>
          <RxDotFilled className='text-red-500 text-2xl flex items-center' />
          <span>Reserved</span>
        </article>
      </section>
    </Card>
  );
}

export default Booking;
