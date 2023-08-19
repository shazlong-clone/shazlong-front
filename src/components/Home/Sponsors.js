import React from 'react';
import Header from '../Shared/Header';
import sponsor1 from '../../assets/images/sponsor1.webp';
import sponsor2 from '../../assets/images/sponsor2.webp';
import sponsor3 from '../../assets/images/sponsor3.webp';
import sponsor4 from '../../assets/images/sponsor4.webp';
import sponsor5 from '../../assets/images/sponsor5.webp';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import clsx from 'clsx';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

function Sponsors() {
  const { t } = useTranslation();
  const sponsors = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5];
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={clsx('text-gray/80 text-3xl top-[50%] absolute left-[-20px] z-50 translate-y-[-40%] cursor-pointer hidden')}
        onClick={onClick}
      >
        <MdOutlineArrowBackIosNew />
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={clsx('text-gray/80 text-3xl top-[50%] absolute left-[-20px] z-50 translate-y-[-40%] cursor-pointer')}
        onClick={onClick}
      >
        <MdOutlineArrowBackIosNew />
      </div>
    );
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className="mt-32">
      <Header>{t('We_Trusted_By')}</Header>
      <Slider {...settings}>
        {sponsors?.map((el) => {
          return <img key={Math.random()} src={el} alt="sponsor" className="h-[100px] lg:h-[150px] object-scale-down" />;
        })}
      </Slider>
    </div>
  );
}

export default Sponsors;
