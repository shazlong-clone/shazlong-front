import React from 'react';
import FeaturedArticales from '../components/Blog/FeaturedArticales';
import LatestArticles from '../components/Blog/LatestArticles';
import NewArticles from '../components/Blog/NewArticles';
import SearchMobile from '../components/Blog/SearchMobile';
import SearchDeskTop from '../components/Blog/SearchDeskTop';
function Blogs() {
  return (
    <>
      <main className="bg-gray/5">
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
