import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { twMerge } from 'tailwind-merge';

function BlogImage({ category, cover, className, id, ...rest }) {
  const { specializationList } = useSelector((state) => state?.shared);
  const { i18n, t } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const url = window.location.protocol + '://' + window.location.host + '/' + locale + '/blog/' + id;

  return (
    <article className={twMerge('h-[250px] relative group', className)} {...rest}>
      <img width="100%" height="100%" className="object-cover rounded-t-lg" src={cover} alt="cover" />
      <div className="absolute bg-[var(--rs-gray-100)]0 top-0 left-0 w-full h-full text-white rounded-t-lg overflow-hidden">
        <span className="bg-[var(--rs-bg-card)] text-[var(--rs-primary-500)] rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">
          {locale === 'ar'
            ? specializationList?.find((el) => el?.id === category)?.ar_name
            : specializationList?.find((el) => el?.id === category)?.name}
        </span>
        <div className="absolute bottom-0 left-0 p-2 translate-y-[100%] group-hover:translate-y-[0%] transition">
          <span className="text-sm">{t('Share_On')}:</span>
          <p className="flex items-center gap-2">
            <FacebookShareButton url={url}>
              <aside className="transition p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-blue-700 hover:text-white">
                <FaFacebookF />
              </aside>
            </FacebookShareButton>
            <LinkedinShareButton url={url}>
              <aside className="transition p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-[#006cb3] hover:text-white">
                <FaLinkedinIn className="scale-[1.2]" />
              </aside>
            </LinkedinShareButton>
            <TwitterShareButton url={url}>
              <aside className="transition p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-sky-400 hover:text-white">
                <FaTwitter className="scale-[1.2]" />
              </aside>
            </TwitterShareButton>
          </p>
        </div>
      </div>
    </article>
  );
}

export default BlogImage;
