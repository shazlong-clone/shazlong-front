import React from 'react';
import Card from '../components/Shared/Card';
import {BsCheckCircle} from 'react-icons/bs'
import InternalHeader from '../components/Shared/InternalHeader';
function Instructions(props) {
    const instuctions = [
        ' Clients have a limit of four cancellations per 30 days. ',
        ' Clients will get a full refund if they canceled the session 12 hours before the appointment. ',
        ' Clients will get a 75% refund if they canceled the session within 12 hours and prior to 6 hours before the appointment. ',
        ' Clients will get a 50% refund if they canceled the session within 6 hours and prior to 3 hours before the appointment. ',
        ' No refund will be applied if the client canceled the session less than three hours before the appointment. ',
        ' Clients are having a limit of only one reschedule per session (for a limited number of sessions) and the action should be taken 6 hours or more prior to the appointment. ',
        ' In case of a therapist no-show that lasts for 15 minutes from the appointment start time, the client can get a full refund or reschedule the session free of any charges. ',
        ' If you are reserving the session from Egypt, you cannot access the session room from elsewhere. Reservations made from Egypt are paid in Egyptian pounds, while reservations made from elsewhere are paid in U.S. dollars. If the session is paid in a non-matching currency, it cannot be refunded. ',
    ]
  return (
    <main className='bg-gray/5 py-3'>
      <div className='container'>
        {/* <h4 className='mb-2 text-center w-[200px] m-auto'></h4> */}
        <InternalHeader className='gap-5 text-center'>Cancellation and Refund Policy</InternalHeader>
        <Card className='mb-5 font-[500]'>
          <p>
          Our policies at Shezlong rely on transparency and aim at providing
          high-quality medical services, protect our clients and therapists from
          service misuse, and respect their time. 
          </p>
          <p>
            Please take a moment to readour policy. 
          </p>
          <p>
            By using our service you’re accepting its terms. 
            Since September 15th, 2021, the policy outlined below has been effect.
          </p>

            {
                instuctions?.map(el => {
                    return <p key={Math.random()}>
                            <BsCheckCircle /> {el}
                    </p>
                })
            }
        </Card>
      </div>
    </main>
  );
}

export default Instructions;
