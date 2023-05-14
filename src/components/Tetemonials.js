import React, { useState } from 'react';
import Header from './Header';
import Slider from 'react-slick';
import clsx from 'clsx';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { GiPlainCircle } from 'react-icons/gi';

function SampleNextArrow(props) {
  const [activeSlider, setActiveSlider] = useState(0);
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

function Tetemonials(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <Header>What Our Clients Are Saying</Header>
      <div className='bg-white rounded-lg p-4'>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Tetemonials;
