import React from 'react';
import therapist from '../../assets/images/therapist.webp';
import Card from './Card';
import Slider from 'react-slick';
import { GiCash } from 'react-icons/gi';
import { Rate, Button } from 'rsuite';
import { BsPlayFill } from 'react-icons/bs';

function DoctorsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <article className="slick-blog slick-container slick-articel mt-10 xl:mt-0 bg-[var(--rs-primary-700)]/30 border border-solid border-cyan p-5  pb-8 rounded-lg">
        <Card className="xl:mb-0 rounded-lg">
          <h3 className="text-center mb-3">Get Help</h3>
          <Slider {...settings}>
            {Array(5)
              .fill('')
              .map(() => {
                return (
                  <div className="border-x-2 border-white border-solid" key={Math.random()}>
                    <article className="text-center">
                      <img
                        className="rounded-full m-auto border border-cyan border-solid p-1 bg-[var(--rs-primary-700)]/10"
                        width="100px"
                        height="100px"
                        src={therapist}
                      />
                    </article>
                    <article className="text-center">
                      <h5 className="text-center text-cyan">Jone Doe</h5>
                      <aside className="text-center">
                        <Rate allowHalf={true} size="sm" defaultValue={3.5} />
                        <small>(250 reviews)</small>
                      </aside>
                      <small>psychotherapist</small>
                      <aside className="flex items-center gap-5 justify-center">
                        <div className="flex items-center gap-2">
                          <GiCash className="text-2xl text-cyan" /> <span>250 egy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsPlayFill className="text-3xl text-cyan" /> <span>250+ sessions</span>
                        </div>
                      </aside>
                    </article>
                    <Button block appearance="primary" className="mt-5">
                      View Profile
                    </Button>
                  </div>
                );
              })}
          </Slider>
        </Card>
      </article>
    </>
  );
}

export default DoctorsSlider;
