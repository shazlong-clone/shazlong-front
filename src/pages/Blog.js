import React from 'react';
import SearchMobile from '../components/Blog/SearchMobile';
import SearchDeskTop from '../components/Blog/SearchDeskTop';
import FeaturedArticales from '../components/Blog/FeaturedArticales';
import LatestArticles from '../components/Blog/LatestArticles';
import NewArticles from '../components/Blog/NewArticles';

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
      <section>
        <LatestArticles />
      </section>
      <section>
        <NewArticles />
      </section>
      
    </main>
  );
}

export default Blog;
