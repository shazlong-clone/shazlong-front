import React from 'react';
import Header from '../Shared/Header';
import therapist from '../../assets/images/therapist.png';
function OurTherapist(props) {
  const saeed = 'sasdasd';
  console.log('saeed');
  localStorage.setItem('sae', 'dd');
  return (
    <div>
      <div className="bg-cyan/20 py-1">
        <Header>Meet Our Therapists</Header>
        <img src={therapist} alt="therapist" className="w-[95%] lg:w-[80%] xl:w-[50%] mb-10 m-auto block" />
      </div>
    </div>
  );
}

export default OurTherapist;
