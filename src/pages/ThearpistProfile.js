import React from 'react';
import Profile from '../components/TherapistProfile/Profile.js';
import InternalHeader from '../components/Shared/InternalHeader.js';
import Intersts from '../components/TherapistProfile/Intersts.js';
import Tetemonials from '../components/TherapistProfile/Tetemonials.js';
import SkillsReview from '../components/TherapistProfile/SkillsReview.js';
import Experience from '../components/TherapistProfile/Experience.js';
import Booking  from '../components/TherapistProfile/Booking.js'
function ThearpistProfile() {
  return (
    <main className='bg-gray/5'>
      <div className='container overflow-auto'>
        <InternalHeader className='lg:mt-10' link='/therapists'>TherapistProfile</InternalHeader>
        <section className='lg:grid lg:grid-cols-2 lg:gap-6'>
          <article>
            <Profile />
            <Booking className='lg:hidden' />
            <Intersts />
            <SkillsReview />
            <Tetemonials />
            <Experience />
          </article>
          <article className='hidden lg:block'>
            <Booking />
          </article>
        </section>
      </div>
    </main>
  );
}

export default ThearpistProfile;
