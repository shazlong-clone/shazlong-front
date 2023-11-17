import React, { useState } from 'react';
import { Input, InputGroup, InputPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import SearchTherapistSideBar from '../Therapists/SearchTherapistSideBar';
import TherapistsCard from '../Therapists/TherapistsCard';
import FilterForm from '../Therapists/FilterForm';
import { filterMenu } from '../../costansts/index';
function TherapistsComp() {
  return (
    <>
      <section className="mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-[1.9fr_5px_1fr]">
          <section>
            <InputGroup size="lg" inside className="mb-10">
              <Input placeholder="Search by Therapist Name" />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </section>
          <section />
          <section className="hidden lg:block">
            <InputPicker block size="lg" data={filterMenu} />
          </section>
        </div>
      </section>
      <section className="flex justify-between gap-3 lg:hidden">
        <SearchTherapistSideBar />
      </section>
      <section className="grid lg:grid-cols-[1fr_2.5fr] gap-10">
        <article className="hidden lg:block">
          <FilterForm />
        </article>
        <article>
          <TherapistsCard />
        </article>
      </section>
    </>
  );
}

export default TherapistsComp;
