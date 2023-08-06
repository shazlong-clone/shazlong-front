import React, { useEffect } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import { Button, Timeline } from 'rsuite';
import { Link } from 'react-router-dom';
import earth from '../assets/images/earth.png';
import chat from '../assets/images/chat.png';
import folder from '../assets/images/folder.png';
import location from '../assets/images/location.png';
import lock from '../assets/images/lock.png';
import note from '../assets/images/note.png';
import CreditCardIcon from '@rsuite/icons/legacy/CreditCard';
import PlaneIcon from '@rsuite/icons/legacy/Plane';
import TruckIcon from '@rsuite/icons/legacy/Truck';
import UserIcon from '@rsuite/icons/legacy/User';
import CheckIcon from '@rsuite/icons/legacy/Check';

const data = [
  {
    image_path: location,
    header: 'Online Sessions',
    body: ' Availability to work from anywhere saving time, effort and cost. ',
  },
  {
    image_path: earth,
    header: 'Universal Therapy',
    body: 'We serve clients from all over the world and you will get paid for both',
  },
  {
    image_path: chat,
    header: 'Better Communication',
    body: ' Availability to communicate with customers via a text chat or via a video call. ',
  },
  {
    image_path: folder,
    header: 'Client history',
    body: ' Access all your client previous prescriptions, so you can give them better help ',
  },
  {
    image_path: lock,
    header: 'Private and Safe',
    body: ' Shezlong is 100% private and secured. ',
  },
  {
    image_path: note,
    header: 'Recorded Notes',
    body: ' Securely keep notes and medical reports for your clients ',
  },
];
function JoinUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <div className="container">
        <InternalHeader className="mb-5">Join Us</InternalHeader>
      </div>
      <div
        className="bg-no-repeat bg-right bg-cover"
        style={{
          backgroundImage: 'url(/img/join-cover.png)',
        }}
      >
        <section className="h-[460px] bg-gradient-to-r from-cyan to-transparent text-white px-5 lg:px-16">
          <h3 className="pt-[50px]  lg:max-w-xl lg:text-4xl lg:mb-10">Join Shezlong now and make your own contribution</h3>
          <p className="text-gray text-[16px] mb-12 lg:max-w-xl lg:text-xl lg:mb-20">
            Enjoy practicing psychotherapy online; now you can communicate with thousands of customers from all over the world
            privately. Join us with other psychiatrists and psychologists worldwide.
          </p>
          <Link to="doctor-sign-up">
            <Button className="rounded-full font-bold">Join Us As Therapist</Button>
          </Link>
        </section>
      </div>
      <div className="bg-cyan/5">
        <main className="container">
          <h4 className="text-center pt-10">What Shezlong offers you</h4>
          <div className="w-[100px] h-[2px] mx-auto mt-2 mb-10 bg-cyan " />
          <section className="lg:grid lg:grid-cols-3 lg:gap-8">
            {data?.map((el) => {
              return (
                <article key={Math.random()} className="flex bg-white rounded-sm gap-4 mb-5">
                  <img src={el?.image_path} className="max-h-[120px]" alt="" />
                  <aside className="py-5">
                    <h5 className="mb-5">{el?.header}</h5>
                    <p>{el?.body}</p>
                  </aside>
                </article>
              );
            })}
          </section>
          <section className="lg:flex lg:gap-10 lg:mt-20 lg:justify-center">
            <h4>
              How to join Shezlong <br />
              therapists’ team ? <div className="w-[100px] h-[2px] mt-2 mb-10 bg-cyan " />
              <article className="pb-24 hidden lg:block">
                <Link to="">
                  <Button appearance="primary" className="rounded-full font-bold">
                    Join Shezlong now
                  </Button>
                </Link>
              </article>
            </h4>
            <Timeline className="custom-timeline pb-10">
              <Timeline.Item dot={<CreditCardIcon />}>
                <strong>Registration</strong>
                <p> Click on join Shezlong now. </p>
              </Timeline.Item>
              <Timeline.Item dot={<PlaneIcon />}>
                <strong>CV</strong>
                <p>upload your own C.V.</p>
              </Timeline.Item>
              <Timeline.Item dot={<TruckIcon />}>
                <strong>Profile</strong>
                <p> Complete your profile </p>
              </Timeline.Item>
              <Timeline.Item dot={<UserIcon />}>
                <strong>Slots</strong>
                <p> Add time slots to run sessions. </p>
              </Timeline.Item>
              <Timeline.Item dot={<CheckIcon />}>
                <strong>End</strong>
                <p>Congratuation You Have Joined Us</p>
              </Timeline.Item>
            </Timeline>
            <article className="text-center pb-24 lg:hidden">
              <Link to="">
                <Button appearance="primary" className="rounded-full font-bold">
                  Join Shezlong now
                </Button>
              </Link>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

export default JoinUs;
