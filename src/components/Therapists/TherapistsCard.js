import React, { useEffect } from 'react';
import { Placeholder } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../features/shared/sharedActions';
import { getPrefix } from '../../features/shared/sharedActions';
import DoctorCard from './DoctorCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setInifinteDoctors, setNextPage } from '../../features/shared/sharedSlice';
export const pageSize = 6;
const LoadinCard = () => {
  return Array(2)
    .fill('')
    ?.map((el) => {
      return (
        <section key={Math.random()} className="bg-white rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0 overflow-hidden">
          <Placeholder.Paragraph style={{ marginTop: 30 }} graph="circle" rows={8} />
        </section>
      );
    });
};
function TherapistsCard({ loading }) {
  const dispatch = useDispatch();
  const { doctors, infiniteDoctors, doctorCurrentPage, doctorSearchParams } = useSelector((state) => state?.shared);
  const handelGetDoctors = async () => {
    dispatch(getAllDoctors({ ...doctorSearchParams, page: doctorCurrentPage, size: pageSize }));
  };
  useEffect(() => {
    handelGetDoctors();
  }, [doctorCurrentPage]);
  useEffect(() => {
    const tempDoctors = doctors?.result ?? [];
    const tempInfinteDoctors = infiniteDoctors ?? [];
    dispatch(setInifinteDoctors([...tempInfinteDoctors, ...tempDoctors]));
  }, [doctors]);
  useEffect(() => {
    dispatch(getPrefix());
  }, []);
  const CardContainer = ({ children }) => {
    return <main className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2 font-[500] lg:mb-18">{children}</main>;
  };

  return (
    <>
      {loading ? (
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
          dataLength={infiniteDoctors?.length ?? pageSize} //This is important field to render the next data
          next={() => {
            dispatch(setNextPage(doctorCurrentPage + 1));
          }}
          hasMore={doctors?.totalPages !== doctors?.currentPage}
          loader={
            <CardContainer>
              <LoadinCard />
            </CardContainer>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <CardContainer>
            {infiniteDoctors?.map((doctor) => {
              return (
                <>
                  <DoctorCard doctor={doctor} />
                </>
              );
            })}
          </CardContainer>
        </InfiniteScroll>
      )}
    </>
  );
}

export default TherapistsCard;
