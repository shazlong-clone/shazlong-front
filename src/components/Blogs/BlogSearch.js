import { createContext, useState } from 'react';
import SearchDeskTop from './SearchDeskTop';
import SearchMobile from './SearchMobile';

export const BlogContext = createContext();
const BlogSearch = () => {
  const [params, setParams] = useState({
    category: [],
    name: '',
  });

  return (
    <BlogContext.Provider
      value={{
        params,
        setParams,
      }}
    >
      <section className="lg:hidden">
        <SearchMobile />
      </section>
      <section className="hidden lg:block">
        <SearchDeskTop />
      </section>
    </BlogContext.Provider>
  );
};

export default BlogSearch;
