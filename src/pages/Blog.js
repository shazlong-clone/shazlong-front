import React from 'react';
import SearchMobile from '../components/Blog/SearchMobile';
import SearchDeskTop from '../components/Blog/SearchDeskTop';
import FeaturedArticales from '../components/Blog/FeaturedArticales';

function Blog() {
  return (
    <main className="bg-gray/5">
      <section className="lg:hidden">
        <SearchMobile />
      </section>
      <section className="hidden lg:block ">
        <SearchDeskTop />
      </section>
      <section>
        <FeaturedArticales />
      </section>
    </main>
  );
}

export default Blog;
