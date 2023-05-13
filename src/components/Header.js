import React from 'react';

function Header(props) {
  return (
    <h1 className='text-gray/90 text-xl md:mb-6 lg:mb-10 lg:text-3xl text-center mt-12 font-bold'>
      {props?.children}
    </h1>
  );
}

export default Header;
