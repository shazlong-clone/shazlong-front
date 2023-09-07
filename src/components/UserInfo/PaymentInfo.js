import React, { useEffect } from 'react';
import vodafone from '../../assets/images/Vodafone_icon.png';
import fawryImg from '../../assets/images/fawry.png';
import CreditCard from './CreditCard';
import VodafonCash from './VodafonCash';
import Fawry from './Fawry'
import viza from '../../assets/images/visa_new.png';
import masterCard from '../../assets/images/master_card_new.svg';
import { useDispatch } from 'react-redux';
import {getPayment} from '../../features/payment/paymentSlice'
function PaymentInfo() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPayment())
  },[]);
  return (
    <article className="relative">
      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex gap-1 items-center">
            <span>
              <img src={viza} alt="viza" />
              <img src={masterCard} alt="masterCard" />
            </span>
            <span>Credit Card</span>
          </aside>
          <aside>
            <CreditCard />
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>
      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex items-center gap-1">
            <img className="w-[20px]" src={vodafone} alt="vodafone" />
            <span className="mt-1">Vodafone Cash</span>
          </aside>
          <aside>
            <VodafonCash />
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
            <Fawry />
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>
    </article>
  );
}

export default PaymentInfo;
