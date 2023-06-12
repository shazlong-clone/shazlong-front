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
import Footer from './Footer';
import FooterMenu from './FooterMenu';
function Info(props) {
  const lg = useMediaQuery('lg');

  return (
    <div className='bg-gray/5 pt-16 pb-16 md:pb-0'>
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
      <div className={clsx(!lg && 'container', 'lg:bg-cyan/20')}>
        <Help />
      </div>
      <div className='relative'>
        <Footer />
        <FooterMenu />
      </div>
    </div>
  );
}

export default Info;
