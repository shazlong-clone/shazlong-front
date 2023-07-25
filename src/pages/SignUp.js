import React from 'react';

import FooterNav from '../components/Shared/SideNav';
import SignUpComp from '../components/Sign/SignUpComp';
function SignUp() {
  return (
    <main className="bg-gray/5 min-h-[100vh]  pb-[74px] md:pb-0">
      <SignUpComp />
      <FooterNav />
    </main>
  );
}

export default SignUp;
