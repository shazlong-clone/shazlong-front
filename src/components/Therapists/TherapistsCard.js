import React, { useEffect } from 'react';
import { Placeholder } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../features/shared/sharedActions';
import { getPrefix } from '../../features/shared/sharedActions';
import DoctorCard from './DoctorCard';

const LoadinCard = () => {
  return Array(12)
    .fill('')
    ?.map((el) => {
      return (
        <section key={Math.random()} className="bg-white rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0 overflow-hidden">
          <Placeholder.Paragraph style={{ marginTop: 30 }} graph="circle" rows={4} />
        </section>
      );
    });
};
function TherapistsCard({ loading }) {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state?.shared);

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getPrefix());
  }, []);

  return (
    <>
      {!doctors?.result?.length ? (
        <div className="text-center mt-20">
          <img src="https://www.jobhai.com/static/no-data.svg" />
          <p className="my-3">No Data Found</p>
        </div>
      ) : (
        <main className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2 font-[500] lg:mb-18">
          {loading ? (
            <LoadinCard />
          ) : (
            doctors?.result?.map((doctor) => {
              return (
                <>
                  <DoctorCard doctor={doctor} />
                </>
              );
            })
          )}
        </main>
      )}
    </>
  );
}

export default TherapistsCard;
