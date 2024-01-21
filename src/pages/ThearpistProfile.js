import React, { useEffect, useState } from 'react';
import Profile from '../components/TherapistProfile/Profile.js';
import InternalHeader from '../components/Shared/InternalHeader.js';
import Intersts from '../components/TherapistProfile/Intersts.js';
import Tetemonials from '../components/TherapistProfile/Tetemonials.js';
import SkillsReview from '../components/TherapistProfile/SkillsReview.js';
import Experience from '../components/TherapistProfile/Experience.js';
import Booking from '../components/TherapistProfile/Booking.js';
import { useParams } from 'react-router-dom';
import { getDoctorProfile } from '../features/shared/sharedActions.js';
import { useDispatch } from 'react-redux';
import NoDataFound from '../components/Shared/NoDataFound.js';
import { Panel, Placeholder } from 'rsuite';
import { useTranslation } from 'react-i18next';
function ThearpistProfile() {
  const [bouncebg, setBounceBg] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch({
      type: 'getDoctorProfile/fulfilled',
      payload: {},
    });
    if (id) {
      setLoading(true);
      dispatch(getDoctorProfile(id))
        .then((res) => {
          if (!res.staus) {
            setError(res.message);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  if (!id || err) {
    return <NoDataFound className="mb-[5rem]" />;
  }
  return (
    <main className="bg-[var(--rs-gray-100)]">
      <div className="container overflow-auto">
        <InternalHeader className="lg:mt-10 mt-5" link="/therapists">
          {t('Therapist_Profile')}
        </InternalHeader>
        <section className="lg:grid lg:grid-cols-2 lg:gap-6 mb-5">
          <article>
            {loading ? (
              <Panel className="bg-[var(--rs-bg-card)] rounded-3xl mt-5">
                <Placeholder graph="circle" rows="3" />
                <Placeholder rows="10" />
              </Panel>
            ) : (
              <Profile setBounceBg={setBounceBg} />
            )}
            <div className="lg:hidden">
              <Booking setBounceBg={setBounceBg} bouncebg={bouncebg} />
            </div>
            {loading ? (
              <>
                <Panel className="bg-[var(--rs-bg-card)] rounded-3xl mt-5">
                  <Placeholder rows="2" />
                </Panel>
                <Panel className="bg-[var(--rs-bg-card)] rounded-3xl mt-5">
                  <Placeholder rows="2" />
                </Panel>
                <Panel className="bg-[var(--rs-bg-card)] rounded-3xl mt-5">
                  <Placeholder rows="5" />
                </Panel>
                <Panel className="bg-[var(--rs-bg-card)] rounded-3xl mt-5">
                  <Placeholder rows="2" />
                </Panel>
              </>
            ) : (
              <>
                <SkillsReview />
                <Tetemonials />
                <Experience />
              </>
            )}
          </article>
          <article className="hidden lg:block">
            {loading ? (
              <>
                <Panel className="bg-[var(--rs-bg-card)] rounded-3xl mt-5">
                  <Placeholder rows="10" />
                </Panel>
                <Panel className="bg-[var(--rs-bg-card)] rounded-3xl mt-5">
                  <Placeholder rows="3" />
                </Panel>
              </>
            ) : (
              <Booking setBounceBg={setBounceBg} bouncebg={bouncebg} />
            )}
          </article>
        </section>
      </div>
    </main>
  );
}

export default ThearpistProfile;
