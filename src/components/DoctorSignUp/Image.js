import React from 'react';
import join from '../../assets/images/join-half-cover..png';
function Image() {
  return (
    <>
      <main className="relative hidden lg:block">
        <img
          className="max-w-full  w-full  lg:h-screen lg:max-h-[100vh] object-cover object-right"
          src={join}
          alt="undraw_sign_up"
        />
        <article className="absolute top-0 left-0 bg-gray/20 h-full w-full text-white text-center">
          <h1 className="flex items-center h-full justify-center lg:max-w-lg lg:m-auto xl:w-full">
            A journey of a thousand miles begins with a single step{' '}
          </h1>
        </article>
      </main>
    </>
  );
}

export default Image;