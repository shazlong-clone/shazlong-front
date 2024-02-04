import React, { useEffect, useMemo, useState } from 'react';
import Card from '../Shared/Card';
import Slider from 'react-slick';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RxDotFilled } from 'react-icons/rx';
import { Button, Input, Modal, Stack } from 'rsuite';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { RxCross2 } from 'react-icons/rx';
import i18next from 'i18next';

const momentOffset =(date,offset) =>{
  if(date && offset){
    return moment(date).utcOffset(offset);

  }
  if(date){
    return moment(date)
  }
  return moment()

}
const formateSlots = (inputSlots, offset) => {
  const doctorSlots = [];
  
  // Group slots by date
  const groupedSlots = inputSlots.reduce((result, slot) => {
    const date = momentOffset(slot.from, offset).format('ddd DD');
    if (!result[date]) {
      result[date] = [];
    }

    const time = momentOffset(slot.from,offset).format('hh:mm A');
    const isBooked = slot.reserved;
    const isSelected = false;

    result[date].push({ h: time, isBooked, isSelected, id:slot?._id });
    return result;
  }, {});

  // Transform the grouped slots into the desired doctorSlots format
  for (const date in groupedSlots) {
    const slots = groupedSlots[date];

    doctorSlots.push({ date, slots });
  }
  return doctorSlots;
};

function Booking({ setBounceBg, bouncebg, ...props }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [timeZons, setTimeZons] = useState({
    fullTimeZons: [],
    searchedTimeZon: [],
  });
  const [selctedTimeZone, setSelctedTimeZone] = useState();

  const getTimeZons = async () => {
    const res = await fetch('/data/timezons.json');
    const resJosn = await res.json();
    setTimeZons({
      fullTimeZons: resJosn,
      searchedTimeZon: resJosn,
    });
    const user_zone = window.localStorage.getItem('user_zone'); 
    setSelctedTimeZone(resJosn?.find(zone => zone?.city === user_zone || 'Africa/Cairo'));
    

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
  const { doctorProfile = {} } = useSelector((state) => state?.shared);


  const slots = useMemo(() => {
    return formateSlots(doctorProfile?.slots ?? [], selctedTimeZone?.date?.replace(/\(|\)/g, ''));
  }, [doctorProfile?.slots, i18next.resolvedLanguage, selctedTimeZone]);

  const [localeSlots, setLocaleSlots] = useState(slots);

  useEffect(() => {
    setLocaleSlots(slots?.map(day =>{
      return {...day, slots:day?.slots?.map(slot =>{
        return {...slot, isSelected: selctedDays?.map(day => day?.slots)?.flat()?.map(s =>s?.id)?.includes(slot?.id) }
      })}
    }));
  }, [slots]);

  useEffect(() => {
    getTimeZons();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setBounceBg(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bouncebg]);
  const handelSelect = (date, h) => {
    const newLocaleSlots = localeSlots?.map((day) => {
      if (day?.date === date) {
        const newLocaleSlots = day?.slots?.map((slot) => {
          if (slot?.h === h && !slot?.isBooked) {
            return { ...slot, isSelected: !slot?.isSelected };
          } else {
            return slot;
          }
        });
        return { ...day, slots: newLocaleSlots };
      } else {
        return day;
      }
    });
    setLocaleSlots(newLocaleSlots);
  };

  const selctedSlotsLength =
    localeSlots
      ?.filter((day) => {
        return day?.slots?.some((d) => d?.isSelected);
      })
      ?.map((day) => {
        return day?.slots?.filter((slot) => {
          return slot?.isSelected;
        });
      })?.length ?? 0;
      const [selctedDays, setSelctedDays] = useState([]);
      useEffect(()=>{
        const selcted = localeSlots
                ?.filter((day) => {
                  return day?.slots?.some((d) => d?.isSelected);
                })
                ?.map((day) => {
                  return {
                    date: day?.date,
                    slots: day?.slots?.filter((slot) => {
                      return slot?.isSelected;
                    })
                  }
                  });                    
        setSelctedDays(selcted);
      },[localeSlots]);
  return (
    <div {...props}>
      <Card className={twMerge('lg:px-10', bouncebg && 'bouncebg')}>
        <h5 className="text-center mb-4">{t('Book_Session')}</h5>
        <Slider {...settings}>
          {localeSlots?.map((day) => {
            return (
              <div
                key={Math.random()}
                className="bg-[var(--rs-primary-100)] border border-solid border-white text-center rounded-lg"
              >
                <section className="text-white bg-[var(--rs-primary-700)] rounded-t-lg py-1 font-bold">{day?.date}</section>
                <section className="grid my-2 gap-2">
                  {day?.slots.map((slot) => {
                    return (
                      <aside key={Math.random()}>
                        <div
                          onClick={() => handelSelect(day?.date, slot?.h)}
                          className={twMerge(
                            clsx(
                              'w-[80%] m-auto p-1 rtl:pt-[7px] text-xs font-[600] rounded-md px-2 cursor-pointer',
                              slot?.isBooked
                                ? 'border border-solid border-[var(--rs-red-400)] text-[var(--rs-red-400)] bg-[var(--rs-red-50)] line-through cursor-not-allowed'
                                : slot?.isSelected
                                ? 'border border-solid border-[var(--rs-green-500)] text-[var(--rs-green-500)] bg-[var(--rs-green-100)] hover:text-[var(--rs-green-700)] hover:bg-[var(--rs-green-200)]'
                                : 'bg-[var(--rs-gray-50)] hover:bg-[var(--rs-gray-400)]',
                            ),
                          )}
                        >
                          {slot?.h}
                        </div>
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
            <RxDotFilled className="text-3xl flex items-center" />
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
          All Times Are {selctedTimeZone?.city + selctedTimeZone?.date }
          <Button appearance="link" onClick={handleOpen}>
            {t('Change')}
          </Button>
        </p>
        <Modal size="lg" keyboard={false} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>
              {t('Change_Time_Zone')} <hr />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center mt-0 py-2">
            <Input onChange={handeSearch} className="w-[300px] mx-auto mb-10" placeholder="search" />
            <section className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] xl:lg:grid-cols-[1fr_1fr_1fr] text-start text-base font-normal">
              {timeZons?.searchedTimeZon?.map((zone) => {
                return (
                  <article onClick={()=>{
                    setSelctedTimeZone(zone);
                    window.localStorage.setItem('user_zone', zone?.city)
                  }} key={zone?.city}>
                    <span className={twMerge(clsx('cursor-pointer hover:bg-[var(--rs-gray-100)]', selctedTimeZone?.city === zone.city ? 'bg-[var(--rs-primary-200)] hover:bg-[var(--rs-primary-200)]' :'')) }>
                      <span>{zone?.city}</span>
                      <span>{zone?.date}</span>
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
          <article className="flex flex-col justify-center gap-3 items-center mb-5">
            <div className=" bg-[var(--rs-green-700)] rounded-full p-3 w-10 h-10 flex justify-center items-center text-white">
              {selctedDays?.map(day=> day?.slots)?.flat()?.length ?? 0}
            </div>
            {
              selctedSlotsLength > 0
              ?<div>{t('Selcted_Slots')}</div>
              :<Stack justifyContent='center'>{t('no_selcted_a_session_yet')}</Stack>
            }
          </article>
          {selctedSlotsLength ? (
            <Stack wrap row spacing={4}>
             {
              selctedDays?.map(day => {
                return day?.slots?.map(slot =>{
                  return <span
                  onClick={() => handelSelect(day?.date, slot?.h)}
                  key={slot?.h}
                  className="
                  p-1 border border-solid 
                  cursor-pointer
                  border-[var(--rs-primary-500)]
                  rounded-md
                  text-[13px]
                  text-[var(--rs-primary-500)]
                  hover:text-[var(--rs-primary-100)]
                  hover:bg-[var(--rs-primary-500)]
                  flex items-center gap-1"
                >
                  {`${day?.date} ${slot?.h}`}
                  <RxCross2 />
                </span>
                })
              })
             }
            </Stack>
          ) :null}
        </section>

        <section className="text-center">
          <Link to={`/checkout?slots_ids=${selctedDays?.map(day=> day?.slots)?.flat()?.map(slot => slot?.id)?.join(',')}`} className="hover:no-underline active:not-underline">
            <Button disabled={!selctedSlotsLength} appearance="primary" color='green' className="block w-1/2 m-auto">
              {t('Book')}
            </Button>
          </Link>
        </section>
      </Card>
    </div>
  );
}

export default Booking;
