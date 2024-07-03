import React, { Fragment } from 'react';
import BlogCard from './BlogCard';
import useMediaQuery from '../../hooks/useMediaQuery';
import NoDataFound from '../Shared/NoDataFound';

function BlogClollection({ title, blogs, loading }) {
  const lg = useMediaQuery('lg');
  const newBlogs = loading ? (lg ? [1, 2, 3] : [1]) : blogs;
  return (
    <div className="container py-4">
      <h3 className="text-center mb-8 xl:text-start xl:mb-4">{title}</h3>
      {!blogs?.length && !loading ? (
        <NoDataFound className="mt-0 mb-20" />
      ) : (
        <section className="xl:grid xl:grid-cols-3 xl:gap-2">
          {newBlogs?.map((blog) => {
            return (
              <Fragment key={Math.random()}>
                <BlogCard blog={blog} loading={loading} />
              </Fragment>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default BlogClollection;
