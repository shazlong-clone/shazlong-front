import React from 'react';
import { Input, InputGroup, InputPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import SearchTherapistSideBar from '../Therapists/SearchTherapistSideBar';
import TherapistsCard, { pageSize } from '../Therapists/TherapistsCard';
import FilterForm from '../Therapists/FilterForm';
import { filterMenu } from '../../costansts/index';
import { setDoctorSearchParams } from '../../features/shared/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../features/shared/sharedActions';

function TherapistsComp() {
  const { doctorSearchParams } = useSelector((state) => state?.shared);
  const dispatch = useDispatch();
  return (
    <>
      <section className="mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-[1.9fr_5px_1fr]">
          <section>
            <InputGroup size="lg" inside className="mb-10">
              <Input
                onChange={(v) => dispatch(setDoctorSearchParams({ ...doctorSearchParams, name: v }))}
                placeholder="Search by Therapist Name"
              />
              <InputGroup.Button onClick={() => dispatch(getAllDoctors({ ...doctorSearchParams, page: 1, size: pageSize }))}>
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
