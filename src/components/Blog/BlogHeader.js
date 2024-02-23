import React from 'react';
import blogimg from '../../assets/images/blogimg.jpg';
import therapist from '../../assets/images/therapist.webp';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { VscBook } from 'react-icons/vsc';
import i18n from '../../i18n';
function BlogHeader() {
  return (
    <>
      <section className="xl:grid xl:grid-cols-2 gap-8 bg-[var(--rs-gray-100)] rounded-lg shadow-lg transition">
        <article className="relative max-h-[350px]">
          <img width="100%" className="object-cover rounded-t-lg xl:rounded-r-none xl:rounded-l-lg max-h-[350px]" src={blogimg} />
          <span className=" text-cyan bg-[var(--rs-bg-card)] rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">wellness</span>
        </article>
        <article className="px-5  xl:px-10 py-2 text-gray/80 xl:relative">
          <aside>
            <h4 className="text-[24px] font-['Roboto'] my-5 xl:text-4xl xl:mt-[25px]">
              How to Stay Healthy and Safe While Fasting During Ramadan:
            </h4>
          </aside>
          <aside className="flex gap-2 items-center">
            <img src={therapist} alt="therapist" className="rounded-full w-[60px] h-[60px]" />
            <span>
              <i className="block">Published By:</i>
              <Link to={`/${i18n.resolvedLanguage}thearpist-profile/555`}>
                <small>John Doe</small>
              </Link>
            </span>
          </aside>
          <aside className="flex gap-2 my-2 justify-between text-sm font-[500] mb-6">
            <span>April 10, 2023</span>
            <div className="flex gap-1">
              <span className="flex items-center gap-1">
                337 <AiFillEye className="text-xl" />
              </span>
              <span className="flex items-center gap-1">
                5min <VscBook className="text-xl text-gray" />
              </span>
            </div>
          </aside>
          <aside className="flex items-center gap-2 [&>span]:cursor-pointer xl:absolute xl:bottom-3 mb-5">
            <strong>
              <small>Share On:</small>
            </strong>
            <span className="hover:bg-blue-700 hover:text-white border border-solid border-gray/10 transition rounded-full w-[25px] h-[25px] flex items-center justify-center">
              <FaFacebookF />
            </span>
            <span className="hover:bg-[#006cb3] hover:text-white border border-solid border-gray/10 transition rounded-full w-[25px] h-[25px] flex items-center justify-center">
              <FaLinkedinIn />
            </span>
            <span className="hover:bg-sky-400 hover:text-white border border-solid border-gray/10 transition rounded-full w-[25px] h-[25px] flex items-center justify-center">
              <FaTwitter />
            </span>
          </aside>
        </article>
      </section>
    </>
  );
}

export default BlogHeader;
