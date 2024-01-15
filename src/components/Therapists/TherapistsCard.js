import React, { Fragment, memo, useEffect, useMemo } from 'react';
import { Placeholder } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors, getSpecialization } from '../../features/shared/sharedActions';
import { getPrefix } from '../../features/shared/sharedActions';
import DoctorCard from './DoctorCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setCurrentDoctorPageSize, setDoctorSearchParams } from '../../features/shared/sharedSlice';
import { useSearchParams } from 'react-router-dom';
export const pageSize = 6;
const LoadinCard = () => {
  return Array(2)
    .fill('')
    ?.map(() => {
      return (
        <section
          key={Math.random()}
          className="bg-[var(--rs-bg-card)] rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0 overflow-hidden"
        >
          <Placeholder.Paragraph style={{ marginTop: 30 }} graph="circle" rows={8} />
        </section>
      );
    });
};
function TherapistsCard() {
  const dispatch = useDispatch();
  const { doctors, doctorCurrentPageSize, doctorSearchLoading } = useSelector((state) => state?.shared);
  const [searchParams] = useSearchParams();
  const search = useMemo(() => {
    return {
      amount: searchParams.getAll('amount')?.map((el) => Number(el)) ?? [10, 500],
      availability: searchParams.get('availability') ?? null,
      country: searchParams.getAll('country')?.map((el) => Number(el)) ?? [],
      specialization: searchParams.getAll('specialization')?.map((el) => Number(el)) ?? [],
      gender: searchParams.get('gender') ?? null,
      languages: searchParams.getAll('languages')?.map((el) => Number(el)) ?? [],
      rate: searchParams.get('rate') ?? null,
      name: searchParams.get('name') ?? '',
      sortBy: searchParams.get('sortBy') ?? '',
      sort: searchParams.get('sort') ?? 'ASC',
      page: searchParams.get('page') ?? 1,
      size: searchParams.get('size') ?? 6,
    };
  }, [searchParams]);
  const handelGetDoctors = async () => {
    dispatch(getAllDoctors({ ...search, page: 1, size: doctorCurrentPageSize }));
  };

  // Iterate through all parameters and log their key-value pairs
  useEffect(() => {
    handelGetDoctors();
  }, [doctorCurrentPageSize]);
  useEffect(() => {
    dispatch(getPrefix());
    dispatch(getSpecialization());
    dispatch(setDoctorSearchParams(search));
  }, []);
  const CardContainer = ({ children }) => {
    return <main className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2 font-[500] lg:mb-18">{children}</main>;
  };

  return (
    <>
      {doctorSearchLoading ? (
        <CardContainer>
          <LoadinCard />
          <LoadinCard />
          <LoadinCard />
        </CardContainer>
      ) : !doctors?.result?.length ? (
        <div className="text-center mt-20">
          <img src="https://www.jobhai.com/static/no-data.svg" />
          <p className="my-3">No Data Found</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={doctors?.result?.length ?? pageSize} //This is important field to render the next data
          next={() => dispatch(setCurrentDoctorPageSize(doctorCurrentPageSize + pageSize))}
          hasMore={doctors?.totalPages !== doctors?.currentPage}
          loader={
            <CardContainer>
              <LoadinCard />
            </CardContainer>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b></b>
            </p>
          }
        >
          <CardContainer>
            {doctors?.result?.map((doctor, i) => {
              return (
                <Fragment key={i}>
                  <DoctorCard doctor={doctor} />
                </Fragment>
              );
            })}
          </CardContainer>
        </InfiniteScroll>
      )}
    </>
  );
}

export default memo(TherapistsCard);
