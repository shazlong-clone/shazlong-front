import React from 'react';
import vodafone from '../../assets/images/Vodafone_icon.png';
import fawryImg from '../../assets/images/fawry.png';
import CreditCard from './CreditCard';

function PaymentInfo() {


  return (
    <article className="relative">
      <CreditCard />
      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex items-center gap-1">
            <img className="w-[20px]" src={vodafone} alt="vodafone" />
            <span className="mt-1">Vodafone Cash</span>
          </aside>
          <aside>
            <a className="cursor-pointer underline">Add New</a>
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>

      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex gap-1">
            <img className="w-[80px]" src={fawryImg} alt="fawry" />
            <span>Fawry</span>
          </aside>
          <aside>
            <a className="cursor-pointer underline">Add New</a>
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>
    </article>
  );
}

export default PaymentInfo;
