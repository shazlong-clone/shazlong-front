import React, { useEffect } from 'react';
import blogimg from '../../assets/images/blogimg.jpg';
import person from '../../assets/images/person.svg';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { VscBook } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialization } from '../../features/shared/sharedActions';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { Helmet } from 'react-helmet';
function BlogHeader({ blog = {} }) {
  const { specializationList } = useSelector((state) => state?.shared);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const url = window.location.href;
  useEffect(() => {
    dispatch(getSpecialization());
  }, []);
  return (
    <>
      <Helmet>
        <title>{blog?.title}</title>
        <meta property="og:title" content={blog?.title} />
        <meta property="og:image" content={blog?.cover} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shezlong Clone" />
        <meta property="og:locale" content={locale === 'ar' ? 'ar_EG' : ' en_US'} />

        <meta name="twitter:title" content={blog?.title} />
        <meta name="twitter:image" content={blog?.cover} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section className="xl:grid xl:grid-cols-2 gap-8 bg-[var(--rs-gray-100)] rounded-lg shadow-lg transition">
        <article className="relative max-h-[350px]">
          <img
            width="100%"
            className="object-cover rounded-t-lg xl:rounded-r-none xl:rounded-l-lg h-[350px]"
            src={blog?.cover ?? blogimg}
          />
          <span className=" text-cyan bg-[var(--rs-bg-card)] rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">
            {locale === 'ar'
              ? specializationList?.find((el) => el?.id === blog?.category)?.ar_name
              : specializationList?.find((el) => el?.id === blog?.category)?.name}
          </span>
        </article>
        <article className="px-5  xl:px-10 py-2 text-gray/80 xl:relative">
          <aside>
            <h4 className="text-[24px] font-['Roboto'] my-5 xl:text-4xl xl:mt-[25px]">{blog?.title}</h4>
          </aside>
          <aside className="flex gap-2 items-center">
            <img src={blog?.publisher?.photo ?? person} alt="therapist" className="rounded-full w-[60px] h-[60px]" />
            <span>
              <i className="block">{t('Published_By')}:</i>
              <Link to={`/${locale}/thearpist-profile/${blog?.publisher?._id}`}>
                <small>{locale === 'ar' ? blog?.publisher?.fullArName : blog?.publisher?.fullEnName}</small>
              </Link>
            </span>
          </aside>
          <aside className="flex gap-2 my-2 justify-between text-sm font-[500] mb-6">
            <span>{moment(blog?.createdAt).isValid() ? moment(blog?.createdAt).format('MMMM D, YYYY') : ''}</span>
            <div className="flex gap-1 items-center">
              <span className="pt-1">{blog?.numOfReader}</span>
              <AiFillEye className="text-xl" />
              <span className="pt-1">{blog?.durationOfReading} {t('Min')}</span>
              <VscBook className="text-xl text-gray" />
            </div>
          </aside>
          <aside className="flex items-center gap-2 [&>span]:cursor-pointer xl:absolute xl:bottom-3 mb-5">
            <strong>
              <small>{t('Share_On')}:</small>
            </strong>
            <FacebookShareButton url={url}>
              <span className="p-2 hover:bg-blue-700 hover:text-white border border-solid border-gray/10 transition rounded-full w-[25px] h-[25px] flex items-center justify-center">
                <FaFacebookF />
              </span>
            </FacebookShareButton>
            <LinkedinShareButton url={url}>
              <span className="p-2 hover:bg-[#006cb3] hover:text-white border border-solid border-gray/10 transition rounded-full w-[25px] h-[25px] flex items-center justify-center">
                <FaLinkedinIn />
              </span>
            </LinkedinShareButton>
            <TwitterShareButton url={url}>
              <span className="p-2 hover:bg-sky-400 hover:text-white border border-solid border-gray/10 transition rounded-full w-[25px] h-[25px] flex items-center justify-center">
                <FaTwitter />
              </span>
            </TwitterShareButton>
          </aside>
        </article>
      </section>
    </>
  );
}

export default BlogHeader;
