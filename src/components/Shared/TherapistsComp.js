import React from 'react';
import { Input, InputGroup, InputPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import SearchTherapistSideBar from '../Therapists/SearchTherapistSideBar';
import TherapistsCard, { pageSize } from '../Therapists/TherapistsCard';
import FilterForm from '../Therapists/FilterForm';
import { sortMenu } from '../../costansts/index';
import { setDoctorSearchLoading, setDoctorSearchParams } from '../../features/shared/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../features/shared/sharedActions';

function TherapistsComp() {
  const { doctorSearchParams, doctorCurrentPageSize } = useSelector((state) => state?.shared);
  const dispatch = useDispatch();
  const handelSortChange = async (id) => {
    const sortion = sortMenu?.find((el) => el?.id === id);
    const newParams = { ...doctorSearchParams, sortBy: sortion?.sortBy, sort: sortion?.sort };
    dispatch(setDoctorSearchParams(newParams));
    dispatch(setDoctorSearchLoading(true));
    await dispatch(getAllDoctors({ ...newParams, page: 1, size: doctorCurrentPageSize }));
    dispatch(setDoctorSearchLoading(false));
  };
  return (
    <>
      <section className="mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-[1.9fr_5px_1fr]">
          <section>
            <InputGroup size="lg" inside className="mb-10">
              <Input
                onChange={(v) => dispatch(setDoctorSearchParams({ ...doctorSearchParams, name: v }))}
                placeholder="Search by Therapist Name"
                onPressEnter={() => dispatch(getAllDoctors({ ...doctorSearchParams, page: 1, size: pageSize }))}
                value={doctorSearchParams?.name || ''}
              />
              <InputGroup.Button onClick={() => dispatch(getAllDoctors({ ...doctorSearchParams, page: 1, size: pageSize }))}>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </section>
          <section />
          <section className="hidden lg:block">
            <InputPicker
              onChange={handelSortChange}
              block
              size="lg"
              data={sortMenu?.map((el) => {
                return { label: el?.label, value: el?.id };
              })}
            />
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
