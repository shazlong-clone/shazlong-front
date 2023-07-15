import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import TherapistsComp from '../components/Shared/TherapistsComp';
function Therapists() {
  return (
    <main className='bg-cyan/5'>
      <div className='container py-4 min-h-[100vh]'>
        <InternalHeader to='/'>
          Therapist List
        </InternalHeader>
        <TherapistsComp />
      </div>
    </main>
  );
}

export default Therapists;
