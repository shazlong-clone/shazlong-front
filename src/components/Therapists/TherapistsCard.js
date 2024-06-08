import React, { Fragment, memo, useEffect } from 'react';
import { Placeholder } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors, getSpecialization } from '../../features/shared/sharedActions';
import { getPrefix } from '../../features/shared/sharedActions';
import DoctorCard from './DoctorCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoDataFound from '../Shared/NoDataFound';
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
  const CardContainer = ({ children }) => {
    return <main className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2 font-[500] lg:mb-18">{children}</main>;
  };
  const doctorSearchParams = useSelector((state) => state?.shared?.doctorSearchParams);

  return (
    <>
      {doctorSearchLoading ? (
        <CardContainer>
          <LoadinCard />
          <LoadinCard />
          <LoadinCard />
        </CardContainer>
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
