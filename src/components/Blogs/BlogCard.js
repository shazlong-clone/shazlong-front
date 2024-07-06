import React from 'react';
import BlogImage from './BlogImage';
import BlogInfo from './BlogInfo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Panel, Placeholder } from 'rsuite';

function BlogCard({ blog, loading }) {
  const { i18n } = useTranslation();
  if (loading) {
    return (
      <Panel className="bg-[var(--rs-bg-card)]">
        <Placeholder rows={10} active />
      </Panel>
    );
  }
  return (
    <section className="rounded-lg group bg-[var(--rs-bg-card)] mb-5 hover:shadow-lg transition overflow-hidden">
      <Link
        to={`/${i18n.resolvedLanguage}/blog/${blog?._id}`}
        className="text-gray/80 hover:no-underline hover:text-gray/80 active:no-underline no-underline"
      >
        <BlogImage cover={blog?.cover} category={blog?.category} id={blog?._id}  />
        <div className="px-2 pt-3 pb-5">
          <h6 className="mt-2 mb-5 group-hover:text-cyan transition cursor-pointer">{blog?.title}</h6>
          <BlogInfo blog={blog} />
        </div>
      </Link>
    </section>
  );
}

export default BlogCard;
