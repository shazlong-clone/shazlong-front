import React from 'react';

import Footer from './Footer';
import FooterNav from './SideNav';

function FooterMenu() {
  return (
    <>
      <div className="relative">
        <Footer />
      </div>
      <FooterNav />
    </>
  );
}

export default FooterMenu;
