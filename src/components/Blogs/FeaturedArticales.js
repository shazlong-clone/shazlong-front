import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import BlogInfo from './BlogInfo';
import Slider from 'react-slick';
import Card from '../Shared/Card';
import therapist from '../../assets/images/therapist.webp';
import { GiCash } from 'react-icons/gi';
import { BsPlayFill } from 'react-icons/bs';
import { Button, Rate } from 'rsuite';
import { Link } from 'react-router-dom';
import { useHover } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function FeaturedArticales() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [ref, hovering] = useHover();

  return (
    <div className="rounded-lg container pb-5 xl:grid xl:grid-cols-[1fr_405px] xl:gap-5 xl:mt-10">
      <section className="xl:grid group xl:grid-cols-2 xl:gap-5 rounded-lg bg-[var(--rs-bg-card)] mt-5 xl:mt-0 hover:shadow-md transition">
        <article className="h-full relative">
          <Link ref={ref}>
            <img
              width="100%"
              height="100%"
              className="object-cover rounded-t-lg xl:rounded-l-lg xl:rounded-t-none"
              src="https://blog.shezlong.com/wp-content/uploads/2023/04/67-1.jpg"
              alt="dd"
            />
            <div className="absolute bg-[var(--rs-gray-100)]0 top-0 left-0 w-full h-full text-white rounded-t-lg xl:rounded-l-lg xl:rounded-t-none overflow-hidden">
              <span className="bg-[var(--rs-bg-card)] text-cyan rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">
                wellness
              </span>
              <div className="absolute bottom-0 left-0 p-2 xl:translate-y-[100%] group-hover:translate-y-[0%] transition">
                <span className="text-sm">shred on:</span>
                <p className="flex items-center gap-2">
                  <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer  hover:bg-blue-700 hover:text-white">
                    <FaFacebookF />
                  </aside>
                  <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-[#006cb3] hover:text-white">
                    <FaLinkedinIn className="scale-[1.2]" />
                  </aside>
                  <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-sky-400 hover:text-white">
                    <FaTwitter className="scale-[1.2]" />
                  </aside>
                </p>
              </div>
            </div>
          </Link>
        </article>
        <article className="xl:grid xl:grid-rows-[auto_1fr_auto] p-2">
          <h3 className="leading-9 mt-3 lg:mb-5">
            <Link className={twMerge(clsx('text-gray/80 hover:no-underline', hovering && 'text-cyan hover:text-cyan'))}>
              How to Stay Healthy and Safe While Fasting During Ramadan:
            </Link>
          </h3>
          <p className="font-medium text-sm text-gray/50 lg:text-[16px] lg:leading-7">
            Fasting during Ramadan can be a challenging experience, especially if you’re new to it. While fasting is an important
            part of the holy month and brings numerous blessings, it also has its risks. It’s important to stay healthy and safe
            while fasting as prolonged fasting…
          </p>
          <BlogInfo />
        </article>
      </section>
      <section className="slick-blog slick-container mt-10 xl:mt-0">
        <Card className="pb-10 xl:mb-0 rounded-lg">
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
                        <Rate color="yellow" allowHalf={true} size="sm" defaultValue={3.5} />
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
                    <Button block appearance="primary" className="my-5">
                      View Profile
                    </Button>
                  </div>
                );
              })}
          </Slider>
        </Card>
      </section>
    </div>
  );
}

export default FeaturedArticales;
