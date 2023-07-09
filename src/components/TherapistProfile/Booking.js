import React, { useEffect, useState } from 'react';
import Card from '../Shared/Card';
import Slider from 'react-slick';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RxDotFilled } from 'react-icons/rx';
import { doctorSlots } from './data';
import { Button, Input, Modal } from 'rsuite';
function Booking({className, ...props}) {
  const [open, setOpen] = React.useState(false);
  const [timeZons, setTimeZons] = useState({
    fullTimeZons: [],
    searchedTimeZon: [],
  });
  const getTimeZons = async () => {
    const res = await fetch('/timrzons.json');
    const resJosn = await res.json();
    setTimeZons({
      fullTimeZons: resJosn,
      searchedTimeZon: resJosn,
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1556,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handeSearch = (value) => {
    const { fullTimeZons } = timeZons;
    if (!value && !value.trim()) {
      setTimeZons({
        ...timeZons,
        searchedTimeZon: fullTimeZons,
      });
    } else {
      const filtered = fullTimeZons?.filter((el) => {
        return el?.city?.toLowerCase()?.includes(value);
      });
      setTimeZons({
        ...timeZons,
        searchedTimeZon: filtered,
      });
    }
  };
  useEffect(() => {
    getTimeZons();
  }, []);

  return (
    <Card {...props} className={twMerge('lg:px-10', className)}>
      
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
                    <aside key={Math.random()}>
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
      <hr />
      <p>
        All Times Are Africa/Cairo{' '}
        <Button appearance='link' onClick={handleOpen}>
          Change
        </Button>{' '}
      </p>
      <Modal size='lg' keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            Change Time Zone <hr />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center mt-0 py-2'>
          <Input
            onChange={handeSearch}
            className='w-[300px] mx-auto mb-10'
            placeholder='search'
          />
          <section className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] xl:lg:grid-cols-[1fr_1fr_1fr] text-start text-base font-normal'>
            {timeZons?.searchedTimeZon?.map((el) => {
              return (
                <article>
                  <span className='cursor-pointer'>
                    <span>{el?.city}</span>
                    <span>{el?.date}</span>
                  </span>
                </article>
              );
            })}
          </section>
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default Booking;
