import { Outlet } from 'react-router-dom';
import SearchMobile from '../Blog/SearchMobile';
import SearchDeskTop from '../Blog/SearchDeskTop';
const BlogLayout = () => {
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
          <Outlet />
        </section>
      </main>
    </>
  );
};
export default BlogLayout;
