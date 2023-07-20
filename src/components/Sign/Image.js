import React from 'react';

function Image() {
  return (
    <>
      <main className="relative">
        <img
          className="max-w-full w-full  lg:h-full lg:max-h-[100vh] object-cover"
          src="https://www.shezlong.com/en/road-bg.a4abe39e13ffffee.jpg"
          alt="undraw_sign_up"
        />
        <article className="absolute top-0 left-0 bg-gray/20 h-full w-full text-white text-center">
          <h1 className="flex items-center h-full justify-center lg:max-w-lg lg:m-auto xl:w-full">
            {' '}
            A journey of a thousand miles begins with a single step{' '}
          </h1>
        </article>
      </main>
    </>
  );
}

export default Image;
