import React from 'react';
import Image from './Image';
import SignLogo from '../Sign/SignLogo';
import DocSignUpForm from './DocSignUpForm';
function SignUpComp() {
  return (
    <main className="lg:px-0 lg:w-full">
      <div className="lg:grid lg:grid-cols-[1fr_1.5fr] items-start">
        <section data-aos="fade-up" data-aos-duration="1000" className="mb-5 mx-auto lg:max-w-sm py-10 container">
          <SignLogo />
          <strong className="mt-8 block">All fields marked with * are required</strong>
          <DocSignUpForm />
        </section>
        <section>
          <Image />
        </section>
      </div>
    </main>
  );
}

export default SignUpComp;
