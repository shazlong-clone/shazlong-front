import React from 'react';

import FooterNav from '../components/Shared/SideNav';
import SignInComp from '../components/Sign/SignInComp';
function SignUp() {
  return (
    <main className="bg-gray/5 min-h-[100vh]  pb-[74px] md:pb-0">
      <SignInComp />
      <FooterNav />
    </main>
  );
}

export default SignUp;
