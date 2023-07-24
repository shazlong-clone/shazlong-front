import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import BlogHeader from '../components/Blog/BlogHeader';
import BlogSlider from '../components/Blog/BlogSlider';
import BlogFooter from '../components/Blog/BlogFooter';

function Blog() {
  return (
    <main className="py-5">
      <div className="container">
        <InternalHeader link="/blogs">Blog</InternalHeader>
        <div className="py-5">
          <BlogHeader />
          <BlogSlider />
          <BlogFooter />
        </div>
      </div>
    </main>
  );
}

export default Blog;
