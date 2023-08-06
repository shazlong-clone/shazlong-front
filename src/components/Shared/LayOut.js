import NavBar from './NavBar';
import FooterMenu from './FooterMenu';
import { Outlet } from 'react-router-dom';
import CustomerServiceDeskTop from './CustomerServiceDeskTop';
import CustomerServiceMobile from './CustomerServiceMobile';

const LayOut = () => {
  return (
    <>
      <div className="pb-[74px] md:pb-0">
        <NavBar />
        <Outlet />
        <FooterMenu />
      </div>
      <div className="hidden lg:block">
        <CustomerServiceDeskTop />
      </div>
      <div className="lg:hidden">
        <CustomerServiceMobile />
      </div>
    </>
  );
};
export default LayOut;
