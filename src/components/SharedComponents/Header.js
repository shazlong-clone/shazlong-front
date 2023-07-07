import React from 'react';

function Header(props) {
  return (
    <h1 className='text-gray/90 text-xl md:mb-6 lg:text-3xl text-center mt-12 lg:mt-16 font-bold mb-6'>
      {props?.children}
    </h1>
  );
}

export default Header;
