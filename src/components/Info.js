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
import useMediaQuery from '../utils/useMediaQuery';
import clsx from 'clsx';
function Info(props) {
  const lg = useMediaQuery('lg');

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
      <div className={clsx(!lg && 'container')}>
        <Help />
      </div>
    </div>
  );
}

export default Info;
