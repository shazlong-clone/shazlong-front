import React, { useMemo } from 'react';
import FeaturedArticales from '../components/Blogs/FeaturedArticales';
import LatestArticles from '../components/Blogs/LatestArticles';
import MostRedArticles from '../components/Blogs/MostRedArticles';
import SearchedArticles from '../components/Blogs/SearchedArticles';
import BlogSearch from '../components/Blogs/BlogSearch';
import { useSearchParams } from 'react-router-dom';

function Blogs() {
  let [searchParams] = useSearchParams();
  const { name, category, page, size } = useMemo(() => {
    return {
      name: searchParams.get('name') ?? '',
      category:
        searchParams
          .getAll('category')
          ?.filter(Boolean)
          ?.map((el) => Number(el)) ?? [],
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      size: searchParams.get('size') ? Number(searchParams.get('size')) : 9,
    };
  }, [searchParams]);
  return (
    <>
      <main className="bg-[var(--rs-gray-100)] blogs">
        <BlogSearch name={name} category={category} />
        <section className="xl:pt-[59px]">
          {!searchParams.has('category') && !searchParams.has('name') ? (
            <>
              <FeaturedArticales />
              <LatestArticles />
              <MostRedArticles />
            </>
          ) : (
            <SearchedArticles params={{ name, category, page, size }} />
          )}
        </section>
      </main>
    </>
  );
}

export default Blogs;
