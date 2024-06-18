import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import BlogInfo from './BlogInfo';
import { Link } from 'react-router-dom';
import { useHover } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import DoctorsSlider from '../Shared/DoctorsSlider';

function FeaturedArticales() {
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
              <span className="bg-[var(--rs-bg-card)] text-[var(--rs-primary-500)] rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">
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
      <DoctorsSlider className='border-0 p-0 article-slider' />
    </div>
  );
}

export default FeaturedArticales;
