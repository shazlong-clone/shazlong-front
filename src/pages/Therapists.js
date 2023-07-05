import React from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {

  Input,
  InputGroup,

} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

import SearchTherapist from '../components/SearchTherapist';
import TherapistsCard from '../components/TherapistsCard';
function Therapists() {


  return (
    <div className='container py-4 bg-cyan/5 min-h-[calc(100vh-74px)] pb-[90px] lg:pb-0'>
      <section className='flex justify-between items-center'>
        <h3>
          <Link to='/' className='flex items-center text-gray'>
            <BsArrowLeftCircle />
          </Link>
        </h3>
        <h4>Therapist List</h4>
        <h3>&nbsp; &nbsp;</h3>
      </section>
      <section className='mt-3'>
        <InputGroup inside className='mb-10'>
          <Input placeholder='Search by Therapist Name' />
          <InputGroup.Button>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
        <article className='flex justify-between gap-3'>
          <SearchTherapist />
        </article>
      </section>
      <section>
        <TherapistsCard />
      </section>
    </div>
  );
}

export default Therapists;
