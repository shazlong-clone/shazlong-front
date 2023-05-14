import React from 'react';
import OnlineTherapist from './OnlineTherapist';
import Diseases from './Diseases';
import HowItWorks from './HowItWorks';
import Tetemonials from './Tetemonials';
import Sponsors from './Sponsors';
import Benfits from './Benfits';
import OurTherapist from './OurTherapist';
import Media from './Media';
import Phone from './Phone';
function Info(props) {
  return (
    <div className='bg-gray/5 py-16'>
      <div className='container'>
        <OnlineTherapist />
        <Diseases />
        <HowItWorks />
        <Tetemonials />
        <Sponsors />
        <Benfits />
      </div>
      <div>
        <OurTherapist />
      </div>
      <div className='container'>
        <Media />
        <Phone />
      </div>
    </div>
  );
}

export default Info;
