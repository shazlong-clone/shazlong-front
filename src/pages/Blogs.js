import React from 'react';
import FeaturedArticales from '../components/Blogs/FeaturedArticales';
import LatestArticles from '../components/Blogs/LatestArticles';
import MostRedArticles from '../components/Blogs/MostRedArticles';
import BlogSearch from '../components/Blogs/BlogSearch';

function Blogs() {
  return (
    <>
      <main className="bg-[var(--rs-gray-100)]">
        <section>
          <BlogSearch />
        </section>
        <section className="xl:pt-[59px]">
          <FeaturedArticales />
          <LatestArticles />
          <MostRedArticles />
        </section>
      </main>
    </>
  );
}

export default Blogs;
