import { useState } from 'react';
import SearchDeskTop from './SearchDeskTop';
import SearchMobile from './SearchMobile';

const BlogSearch = ({ category, name }) => {
  const [params, setParams] = useState({
    category: category ?? [],
    name: name ?? '',
  });

  return (
    <>
      <section className="lg:hidden">
        <SearchMobile params={params} setParams={setParams} />
      </section>
      <section className="hidden lg:block">
        <SearchDeskTop params={params} setParams={setParams} />
      </section>
    </>
  );
};

export default BlogSearch;
