import React from 'react';
import BlogHtml from './BlogHtml';
import DoctorsSlider from '../Shared/DoctorsSlider';
function BlogSlider({ blog }) {
  return (
    <>
      <section className="xl:grid xl:grid-cols-[1fr_450px] xl:items-start gap-6 py-10 ">
        <article className="px-2 xl:px-0 blog-content">
          <BlogHtml blog={blog} />
        </article>
        <article>
          <DoctorsSlider />
        </article>
      </section>
    </>
  );
}

export default BlogSlider;
