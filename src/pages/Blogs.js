import React from 'react';
import FeaturedArticales from '../components/Blogs/FeaturedArticales';
import LatestArticles from '../components/Blogs/LatestArticles';
import NewArticles from '../components/Blogs/NewArticles';
import SearchMobile from '../components/Blogs/SearchMobile';
import SearchDeskTop from '../components/Blogs/SearchDeskTop';
function Blogs() {
  return (
    <>
      <main className="bg-[var(--rs-gray-100)]">
        <section className="lg:hidden">
          <SearchMobile />
        </section>
        <section className="hidden lg:block">
          <SearchDeskTop />
        </section>
        <section className="xl:pt-[59px]">
          <FeaturedArticales />
          <LatestArticles />
          <NewArticles />
        </section>
      </main>
    </>
  );
}

export default Blogs;
