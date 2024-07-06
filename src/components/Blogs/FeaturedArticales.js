import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import BlogInfo from './BlogInfo';
import { Link } from 'react-router-dom';
import { useHover } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import DoctorsSlider from '../Shared/DoctorsSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../features/blog/blogAction';
import { getSpecialization } from '../../features/shared/sharedActions';
import { useTranslation } from 'react-i18next';
import { Panel, Placeholder, Text } from 'rsuite';
import parse from 'html-react-parser';
import { FacebookShareButton, LineShareButton, TwitterShareButton } from 'react-share';

function FeaturedArticles() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const [ref, hovering] = useHover();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { specializationList } = useSelector((state) => state?.shared);
  const [featuredBlog, setFeaturedBlog] = useState({});
  const url = window.location.protocol + '://' + window.location.host + '/' + locale + '/blog/' + featuredBlog?._id;
  useEffect(() => {
    setLoading(true);
    dispatch(getBlogs({ isFeatured: true, size: 1, page: 1 }))
      .then((res) => {
        setFeaturedBlog(res?.payload?.result?.data?.at(0));
      })
      .finally(() => {
        setLoading(false);
      });
    dispatch(getSpecialization());
  }, []);
  return (
    <>
      <div className="rounded-lg container pb-5 xl:grid xl:grid-cols-[1fr_405px] xl:gap-5 xl:mt-10">
        {loading ? (
          <Panel className="bg-[var(--rs-bg-card)]">
            <Placeholder rows={14} active />
          </Panel>
        ) : (
          <section className="xl:grid group xl:grid-cols-2 xl:gap-5 rounded-lg bg-[var(--rs-bg-card)] mt-5 xl:mt-0 hover:shadow-md transition">
            <article className="h-full relative">
              <Link ref={ref} to={`/${locale}/blog/${featuredBlog?._id}`}>
                <img
                  width="100%"
                  height="100%"
                  className="object-cover rounded-t-lg xl:rounded-l-lg xl:rounded-t-none"
                  src={featuredBlog?.cover}
                  alt="cover"
                />
                <div className="absolute bg-[var(--rs-gray-100)]0 top-0 left-0 w-full h-full text-white rounded-t-lg xl:rounded-l-lg xl:rounded-t-none overflow-hidden">
                  <span className="bg-[var(--rs-bg-card)] text-[var(--rs-primary-500)] rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">
                    {locale === 'ar'
                      ? specializationList?.find((el) => el?.id === featuredBlog?.category)?.ar_name
                      : specializationList?.find((el) => el?.id === featuredBlog?.category)?.name}
                  </span>
                  <div className="absolute bottom-0 left-0 p-2 xl:translate-y-[100%] group-hover:translate-y-[0%] transition">
                    <span className="text-sm">{t('shred_on')}:</span>
                    <p className="flex items-center gap-2">
                      <FacebookShareButton url={url}>
                        <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer  hover:bg-blue-700 hover:text-white">
                          <FaFacebookF />
                        </aside>
                      </FacebookShareButton>
                      <LineShareButton url={url}>
                        <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-[#006cb3] hover:text-white">
                          <FaLinkedinIn className="scale-[1.2]" />
                        </aside>
                      </LineShareButton>
                      <TwitterShareButton url={url}>
                        <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-sky-400 hover:text-white">
                          <FaTwitter className="scale-[1.2]" />
                        </aside>
                      </TwitterShareButton>
                    </p>
                  </div>
                </div>
              </Link>
            </article>
            <article className="xl:grid xl:grid-rows-[auto_1fr_auto]">
              <h3 className="leading-9 mt-3 lg:mb-5">
                <Link
                  to={`/${locale}/blog/${featuredBlog?._id}`}
                  className={twMerge(clsx('text-gray/80 hover:no-underline', hovering && 'text-cyan hover:text-cyan'))}
                >
                  {featuredBlog?.title}
                </Link>
              </h3>
              <p className="font-medium text-sm text-gray/50 lg:text-[16px] lg:leading-7">
                {<Text maxLines={8}>{parse(featuredBlog?.body ?? '')}</Text>}
              </p>
              <BlogInfo blog={featuredBlog} />
            </article>
          </section>
        )}

        <DoctorsSlider className="border-0 p-0 article-slider" />
      </div>
    </>
  );
}

export default FeaturedArticles;
