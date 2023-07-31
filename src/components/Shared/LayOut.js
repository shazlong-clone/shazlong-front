import NavBar from './NavBar';
import FooterMenu from './FooterMenu';
import { Outlet } from 'react-router-dom';
import CustomerService from '../Shared/CustomerService';

const LayOut = () => {
  return (
    <>
      <div className="pb-[74px] md:pb-0">
        <NavBar />
        <Outlet />
        <FooterMenu />
        <CustomerService />
      </div>
    </>
  );
};
export default LayOut;
