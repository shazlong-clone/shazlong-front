import React from 'react';

function Header(props) {
  return (
    <h1 className="text-[var(--rs-gray-900)] text-xl md:mb-6 lg:text-3xl text-center mt-12 lg:mt-20 font-bold mb-6">{props?.children}</h1>
  );
}

export default Header;
