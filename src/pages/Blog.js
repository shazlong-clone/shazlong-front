import React from 'react';
import SearchMobile from '../components/Blog/SearchMobile';
import SearchDeskTop from '../components/Blog/SearchDeskTop';
import FeaturedArticales from '../components/Blog/FeaturedArticales';
import LatestArticles from '../components/Blog/LatestArticles';
import NewArticles from '../components/Blog/NewArticles';

function Blog() {
  return (
    <>
    <section>
    <FeaturedArticales />
  </section>
  <section>
    <LatestArticles />
  </section>
  <section>
    <NewArticles />
  </section>
    </>
  );
}

export default Blog;
