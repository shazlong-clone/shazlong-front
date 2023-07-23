import React from 'react';
import FeaturedArticales from '../components/Blog/FeaturedArticales';
import LatestArticles from '../components/Blog/LatestArticles';
import NewArticles from '../components/Blog/NewArticles';

function Blogs() {
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

export default Blogs;
