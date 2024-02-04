import React from 'react';
import Card from '../components/Shared/Card';
import { Animation } from 'rsuite';
import { BiChevronDown } from 'react-icons/bi';
import clsx from 'clsx';
import { L1, L2, L3, L4, L5, L6, L7, L8 } from '../components/Licences/Terms';
function Licence() {
  const Panel = React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <section className="py-2 px-2 bg-[var(--rs-bg-card)] text-gray text-[13px] font-bold">{props?.body}</section>
    </div>
  ));
  const [licences, setLicence] = React.useState([
    {
      title: 'What do we do with data provided by the user',
      body: <L1 />,
      open: false,
    },
    {
      title: 'We may disclose your user data to a third party in the following cases:',
      body: <L2 />,
      open: false,
    },
    {
      title: 'Updates',
      body: <L3 />,
      open: false,
    },
    {
      title: 'Data collection',
      body: <L4 />,
      open: false,
    },
    {
      title: 'Unsubscribe',
      body: <L5 />,
      open: false,
    },
    {
      title: 'Text files (cookies)',
      body: <L6 />,
      open: false,
    },
    {
      title: 'Protect your user information',
      body: <L6 />,
      open: false,
    },
    {
      title: 'Protect your user information',
      body: <L7 />,
      open: false,
    },
    {
      title: 'To call',
      body: <L8 />,
      open: false,
    },
  ]);
  const onChange = (index) => {
    setLicence((oldLicences) => {
      const newLicences = oldLicences?.map((el, i) => {
        if (i === index) {
          return { ...el, open: !el?.open };
        } else {
          return { ...el, open: false };
        }
      });
      return newLicences;
    });
  };

  return (
    <main className="bg-[var(--rs-gray-100)] py-2 licence">
      <div className="container">
        <section>
          <h2>Privacy and Policy</h2>
          <h6>Date of Last Revision: 2/7/2017</h6>
          <Card className="rounded-none mt-10">
            <h3 className="text-cyan">Welcome To Shzlong</h3>
            <p>
              The privacy policy is applied to all personal data, which you provide (User Data) through the website
              www.shezlong.com or our e-mail application. It has been developed in order to strengthen confidence about the
              privacy and safety of your personal details as that is one of our most important goals. &quot;You&quot; refers to
              the user. &quot;We&quot; means Shezlong company. &quot;Users&quot; refers generally and \ or individually to users
              of the site as the context indicates. We deal with all personal data and information of user in full accordance to
              all relevant legislation protecting privacy.
            </p>
            <p>The policy is founded on these rules:</p>
            <p>
              Data that you are asked to be included are the key information needed to complete the process of booking
              appointments with a specialist. Whatever is going on inside the meeting is your own and you share it with the
              specialist (based on a confidential relationship and respect for privacy). We do not collect, process or retrieve
              any information exchanged between you and the worker during the session. No one will know that you have sessions
              with psychological specialist through the site Shezlong unless you tell about that. People who are able to know
              about your meeting with the specialist are the site administrators and staff to provide you with the service. No one
              of the Shezlong crew knows about your meetings with the psychologist, only those whom job is based on this
              information (aiming to provide the service and the best measure of efficiency)
            </p>
            <h4 className="pt-5">Privacy and Policy</h4>

            <ul className="p-0  list-none bg-gray  rounded-sm border border-white/75 border-solid divide-x-0 divide-solid divide-y divide-white">
              {licences.map((el, i) => {
                return (
                  <li key={i}>
                    <p onClick={() => onChange(i)} className="p-3 flex gap-10 items-center font-bold cursor-pointer">
                      <span className="grow text-sm">{el?.title}</span>
                      <span>
                        <BiChevronDown className={clsx('text-2xl', el.open ? 'animate-rclock' : 'animate-raclock')} />
                      </span>
                    </p>
                    <div>
                      <Animation.Collapse timeout={3000} in={el?.open} dimension="height">
                        {(props, ref) => <Panel body={el?.body} {...props} ref={ref} />}
                      </Animation.Collapse>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default Licence;
