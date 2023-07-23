import React, { Fragment } from 'react';
import Blog from './BlogCard';

function BlogClollection({ title, blogs }) {
  return (
    <div className="container py-4">
      <h3 className="text-center my-8 xl:text-start xl:mb-4">{title}</h3>
      <section className="xl:grid xl:grid-cols-3 xl:gap-2">
        {blogs?.map((blog) => {
          return (
            <Fragment key={Math.random()}>
              <Blog blog={blog} />
            </Fragment>
          );
        })}
      </section>
    </div>
  );
}

export default BlogClollection;
