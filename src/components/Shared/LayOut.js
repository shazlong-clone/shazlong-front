import NavBar from './NavBar';
import FooterMenu from './FooterMenu';
import { Outlet } from 'react-router-dom';
const LayOut = () => {
  return (
    <>
      <div className="pb-[74px] md:pb-0">
        <NavBar />
        <Outlet />
        <FooterMenu />
      </div>
    </>
  );
};
export default LayOut;
