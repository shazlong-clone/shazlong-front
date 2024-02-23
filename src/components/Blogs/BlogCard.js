import React from 'react';
import BlogImage from './BlogImage';
import BlogInfo from './BlogInfo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Card({ blog }) {
  const {i18n} = useTranslation();
  return (
    <section className="rounded-lg group bg-[var(--rs-bg-card)] mb-5 hover:shadow-lg transition overflow-hidden">
      <Link to={`${i18n.resolvedLanguage}/blog/55`} className="text-gray/80 hover:no-underline hover:text-gray/80 active:no-underline no-underline">
        <BlogImage />
        <div className="px-2 pt-3 pb-5">
          <h6 className="mt-2 mb-5 group-hover:text-cyan transition cursor-pointer">{blog.body}</h6>
          <BlogInfo />
        </div>
      </Link>
    </section>
  );
}

export default Card;
