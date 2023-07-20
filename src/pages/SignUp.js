import React from 'react';

import FooterNav from '../components/Shared/FooterNav';
import SignUpForm from '../components/SignUp/SignUpForm';
function SignUp() {
  return (
    <main className="bg-gray/5 min-h-[100vh]  pb-[74px] md:pb-0">
      <SignUpForm />
      <FooterNav />
    </main>
  );
}

export default SignUp;
