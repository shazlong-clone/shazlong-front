import React from 'react';
import Profile from '../components/TherapistProfile/Profile.js';
import InternalHeader from '../components/Shared/InternalHeader.js';
import Intersts from '../components/TherapistProfile/Intersts.js';
function ThearpistProfile() {
  return (
    <div className='container overflow-auto bg-gray/5'>
      <InternalHeader link='/'>Therapist List</InternalHeader>
      <Profile />
      <Intersts />
    </div>
  );
}

export default ThearpistProfile;
