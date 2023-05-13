import React from 'react';
import OnlineTherapist from './OnlineTherapist';
import Diseases from './Diseases';
import HowItWorks from './HowItWorks';
function Info(props) {
  return (
    <div className='bg-gray/5 py-16'>
      <div className='container'>
        <OnlineTherapist />
        <Diseases />
        <HowItWorks />
      </div>
    </div>
  );
}

export default Info;
