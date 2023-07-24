import React from 'react';
import blogimg from '../assets/images/blogimg.jpg';
import therapist from '.././assets/images/therapist.webp';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { VscBook } from 'react-icons/vsc';
import BlogHtml from '../components/Shared/BlogHtml';
import Card from '../components/Shared/Card';
import Slider from 'react-slick';
import { GiCash } from 'react-icons/gi';
import { Button, Rate } from 'rsuite';
import { BsPlayFill } from 'react-icons/bs';

function Blog() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <main className="py-5">
      <div className="container">
        <div className=" px-5 py-5">
          <section className="xl:grid xl:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
            <article className="relative max-h-[350px]">
              <img
                width="100%"
                className="object-cover rounded-t-lg xl:rounded-r-none xl:rounded-l-lg max-h-[350px]"
                src={blogimg}
              />
              <span className=" text-cyan rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">wellness</span>
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
                  <Link to="thearpist-profile/555">
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
              <aside className="flex items-center gap-2 [&>span]:cursor-pointer xl:absolute xl:bottom-3">
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
          <section className="xl:grid xl:grid-cols-[1fr_450px] xl:items-start gap-6 py-10 ">
            <article className="px-2 xl:px-0 blog-content">
              <BlogHtml />
            </article>
            <article className="slick-blog slick-container slick-articel mt-10 xl:mt-0 bg-cyan/30 border border-solid border-cyan p-5 pb-8 rounded-lg">
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
                              className="rounded-full m-auto border border-cyan border-solid p-1 bg-cyan/10"
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
          </section>
        </div>
      </div>
    </main>
  );
}

export default Blog;
