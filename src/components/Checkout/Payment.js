import React from 'react';
import { CRIDIT_CARD, FAWRY, PHONE_CASH } from '../../assets/constants';
import CreditCard from './CreditCard';
import VodafoneCash from './VodafoneCash';
import Fawry from './Fawry';

function Payment({ data }) {
  const { subTotal, transctionFeez, discountState, paymentMethod } = data;

  return paymentMethod === CRIDIT_CARD ? (
    <CreditCard data={{ subTotal, transctionFeez, discountState }} />
  ) : paymentMethod === PHONE_CASH ? (
    <VodafoneCash data={{ subTotal, transctionFeez, discountState }} />
  ) : paymentMethod === FAWRY ? (
    <Fawry data={{ subTotal, transctionFeez, discountState }} />
  ) : null;
}

export default Payment;
