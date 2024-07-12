import React, { Fragment, memo, useEffect } from 'react';
import { Placeholder } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors, getSpecialization } from '../../features/shared/sharedActions';
import { getPrefix } from '../../features/shared/sharedActions';
import DoctorCard from './DoctorCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoDataFound from '../Shared/NoDataFound';
export const pageSize = 6;
const cardContainerClassName = 'lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2 font-[500] lg:mb-18';
const LoadinCard = () => {
  return Array(2)
    .fill('')
    ?.map(() => {
      return (
        <section
          key={Math.random()}
          className="bg-[var(--rs-bg-card)] rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0 overflow-hidden"
        >
          <Placeholder.Paragraph style={{ marginTop: 30 }} graph="circle" rows={8} active />
        </section>
      );
    });
};
function TherapistsCard() {
  const dispatch = useDispatch();
  const { doctors, doctorSearchLoading } = useSelector((state) => state?.shared);

  useEffect(() => {
    dispatch(getPrefix());
    dispatch(getSpecialization());
  }, []);
  const doctorSearchParams = useSelector((state) => state?.shared?.doctorSearchParams);

  return (
    <>
      {doctorSearchLoading ? (
        <main className={cardContainerClassName}>
          <LoadinCard />
          <LoadinCard />
          <LoadinCard />
        </main>
      ) : !doctors?.result?.length ? (
        <NoDataFound />
      ) : (
        <InfiniteScroll
          dataLength={doctors?.result?.length ?? pageSize} //This is important field to render the next data
          next={() => {
            dispatch(getAllDoctors({ ...doctorSearchParams, page: (+doctors?.currentPage ?? 0) + 1, size: pageSize }));
          }}
          hasMore={doctors?.totalPages !== doctors?.currentPage}
          loader={
            <main className={cardContainerClassName}>
              <LoadinCard />
            </main>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b></b>
            </p>
          }
        >
          <main className={cardContainerClassName}>
            {doctors?.result?.map((doctor) => {
              return (
                <Fragment key={doctor?._id}>
                  <DoctorCard doctor={doctor} />
                </Fragment>
              );
            })}
          </main>
        </InfiniteScroll>
      )}
    </>
  );
}

export default memo(TherapistsCard);
