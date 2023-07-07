import React from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Input, InputGroup, InputPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import SearchTherapist from '../components/TherapistsComponents/SearchTherapist';
import TherapistsCard from '../components/TherapistsComponents/TherapistsCard';
import FilterForm from '../components/TherapistsComponents/FilterForm';
import { filterMenu } from '../costansts/index';

function Therapists() {
  return (
    <main className='bg-cyan/5'>
      <div className='container py-4 min-h-[100vh]'>
        <section className='flex justify-between items-center lg:mb-10 mt-5'>
          <h3>
            <Link to='/' className='flex items-center text-gray'>
              <BsArrowLeftCircle />
            </Link>
          </h3>
          <h3>Therapist List</h3>
          <h3>&nbsp; &nbsp;</h3>
        </section>
        <section className='mt-3'>
          <div className='grid grid-cols-1 lg:grid-cols-[2.1fr_1fr] gap-2'>
            <section>
              <InputGroup size='lg' inside className='mb-10'>
                <Input placeholder='Search by Therapist Name' />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </section>
            <section className='hidden lg:block'>
              <InputPicker
                size='lg'
                block
                data={filterMenu}
              />
            </section>
          </div>
        </section>
        <section className='flex justify-between gap-3 lg:hidden'>
          <SearchTherapist />
        </section>
        <section className='grid lg:grid-cols-[1fr_2fr] gap-10'>
          <article className='hidden lg:block'>
            <FilterForm />
          </article>
          <article>
            <TherapistsCard />
          </article>
        </section>
      </div>
    </main>
  );
}

export default Therapists;
