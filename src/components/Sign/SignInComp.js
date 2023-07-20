import React from 'react';
import 'aos/dist/aos.css';
import Image from './Image';
import SignLogo from './SignLogo';
import SignInForm from './SignInForm';
function SignInComp() {
  return (
    <main className="lg:px-0 lg:w-full">
      <div className="lg:grid lg:grid-cols-[1fr_1.5fr] items-start">
        <section data-aos="fade-up" data-aos-duration="1000" className="mb-5 mx-auto lg:max-w-sm py-10 container">
          <SignLogo />
          <SignInForm />
        </section>
        <section>
          <Image />
        </section>
      </div>
    </main>
  );
}

export default SignInComp;
