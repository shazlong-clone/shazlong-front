import React from 'react';
import Header from '../Shared/Header';
import media1 from '../../assets/images/media1.webp';
import media2 from '../../assets/images/media2.webp';
import media3 from '../../assets/images/media3.webp';
import media4 from '../../assets/images/media4.webp';
import media5 from '../../assets/images/media5.webp';
import media6 from '../../assets/images/media6.webp';
import clsx from 'clsx';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Slider from 'react-slick';
function Media() {
  const media = [media1, media2, media6, media5, media3, media4];
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={clsx('text-gray/80 text-4xl top-[50%] absolute right-[-40px] z-50 translate-y-[-40%] cursor-pointer')}
        onClick={onClick}
      >
        <MdOutlineKeyboardArrowRight />
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={clsx('text-gray/80 text-4xl top-[50%] absolute left-[-40px] z-50 translate-y-[-40%] cursor-pointer')}
        onClick={onClick}
      >
        <MdOutlineKeyboardArrowLeft />
      </div>
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className="mt-20 px-7">
      <Header>Our Media Coverage</Header>
      <div>
        <Slider {...settings}>
          {media?.map((el) => {
            return (
              <img
                key={Math.random()}
                src={el}
                alt="sponsor"
                className="h-[100px] lg:h-[150px] object-scale-down grayscale hover:grayscale-0 duration-300"
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Media;
