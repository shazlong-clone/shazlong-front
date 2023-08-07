import React from 'react';
import FooterNav from '../components/Shared/SideNav';
import DoctorSignUpComp from '../components/DoctorSignUp/DoctorSignUpComp';
function DoctorSignUp() {
  return (
    <main className="bg-gray/5 min-h-[100vh]  pb-[74px] md:pb-0">
      <DoctorSignUpComp />
      <FooterNav />
    </main>
  );
}

export default DoctorSignUp;
