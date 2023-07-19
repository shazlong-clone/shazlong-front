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
import Help from './Help';

function Info(props) {
  return (
    <div className="bg-gray/5 pt-16 md:pb-0">
      <div className="container">
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
      <div className="container">
        <Media />
        <Phone />
      </div>
      <div className="container lg:max-w-full lg:px-0  lg:py-0 py-10">
        <Help />
      </div>
    </div>
  );
}

export default Info;
