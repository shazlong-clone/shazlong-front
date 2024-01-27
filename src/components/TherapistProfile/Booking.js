import React, { useEffect, useState } from 'react';
import Card from '../Shared/Card';
import Slider from 'react-slick';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RxDotFilled } from 'react-icons/rx';
import { doctorSlots } from './data';
import { Button, Input, Modal, Tag } from 'rsuite';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Booking({ setBounceBg, bouncebg, ...props }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [timeZons, setTimeZons] = useState({
    fullTimeZons: [],
    searchedTimeZon: [],
  });
  const getTimeZons = async () => {
    const res = await fetch('api/timrzons.json');
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
    slidesToShow: 5,
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
        className={clsx('text-cyan text-3xl top-[50%] absolute right-[-30px] translate-y-[-40%] cursor-pointer')}
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
        className={clsx('text-cyan text-3xl top-[50%] absolute left-[-30px] translate-y-[-40%] cursor-pointer z-[5]')}
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
  useEffect(() => {
    setTimeout(() => {
      setBounceBg(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bouncebg]);

  return (
    <div {...props}>
      <Card className={twMerge('lg:px-10', bouncebg && 'bouncebg')}>
        <h5 className="text-center mb-4">Book Session</h5>
        <Slider {...settings}>
          {doctorSlots.map((el) => {
            return (
              <div
                key={Math.random()}
                className="bg-[var(--rs-primary-100)] border border-solid border-white text-center rounded-lg"
              >
                <section className="text-white bg-[var(--rs-primary-700)] rounded-t-lg py-1 font-bold">Sat 08</section>
                <section className="grid my-2 gap-2">
                  {el?.slots.map((slot) => {
                    return (
                      <aside key={Math.random()}>
                        <span
                          className={twMerge(
                            clsx(
                              'p-1 rtl:pt-[7px] text-xs font-[600] rounded-md px-2 cursor-pointer',
                              slot?.isBooked
                                ? 'border border-solid border-[var(--rs-red-400)] text-[var(--rs-red-400)] bg-[var(--rs-red-50)] line-through cursor-not-allowed'
                                : slot?.isSelected
                                ? 'border border-solid border-[var(--rs-green-500)] text-[var(--rs-green-500)] bg-[var(--rs-green-100)] hover:text-[var(--rs-green-700)] hover:bg-[var(--rs-green-200)]'
                                : 'bg-[var(--rs-gray-50)] hover:bg-[var(--rs-gray-400)]',
                            ),
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
        <section className="flex text-center gap-4 justify-center mt-5">
          <article className="flex items-center">
            <RxDotFilled className="text-gray/25 text-3xl flex items-center" />
            <span className="pt-1">{t('Available')}</span>
          </article>
          <article className="flex items-center">
            <RxDotFilled className="text-[var(--rs-green-900)] text-3xl flex items-center" />
            <span className="pt-1">{t('Seleced')}</span>
          </article>
          <article className="flex items-center">
            <RxDotFilled className="text-red-500 text-3xl flex items-center" />
            <span className="pt-1">{t('Reserved')}</span>
          </article>
        </section>
        <hr />
        <p>
          All Times Are Africa/Cairo{' '}
          <Button appearance="link" onClick={handleOpen}>
            Change
          </Button>
        </p>
        <Modal size="lg" keyboard={false} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>
              Change Time Zone <hr />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center mt-0 py-2">
            <Input onChange={handeSearch} className="w-[300px] mx-auto mb-10" placeholder="search" />
            <section className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] xl:lg:grid-cols-[1fr_1fr_1fr] text-start text-base font-normal">
              {timeZons?.searchedTimeZon?.map((el) => {
                return (
                  <article key={Math.random()}>
                    <span className="cursor-pointer">
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
      <Card>
        <section className="mb-2">
          <article className="flex justify-center gap-3 items-center mb-5">
            <span className=" bg-[var(--rs-primary-700)] rounded-full p-3 w-10 h-10 flex justify-center items-center text-white">
              2
            </span>
            <span>Selected Slots</span>
          </article>
          <Tag closable className="mb-2 bg-gray/10 ">
            saeed
          </Tag>
          <Tag closable className="mb-2 bg-gray/10 ">
            saeed
          </Tag>
          <Tag closable className="mb-2 bg-gray/10 ">
            saeed
          </Tag>
        </section>
        <section className="text-center">
          <Link to="/checkout/5/5" className="hover:no-underline active:not-underline">
            <Button appearance="primary" className="block w-full">
              Book
            </Button>
          </Link>
        </section>
      </Card>
    </div>
  );
}

export default Booking;
