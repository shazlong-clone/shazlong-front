import React, { useEffect } from 'react';
import vodafone from '../../assets/images/Vodafone_icon.png';
import fawryImg from '../../assets/images/fawry.png';
import CreditCard from './CreditCard';
import VodafonCash from './VodafonCash';
import Fawry from './Fawry';
import viza from '../../assets/images/visa_new.png';
import masterCard from '../../assets/images/master_card_new.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdatePayment, getPayment } from '../../features/payment/paymentSlice';
import { FlexboxGrid, Message, useToaster } from 'rsuite';
import { useTranslation } from 'react-i18next';
function PaymentInfo() {
  const dispatch = useDispatch();
  const { card, vodafoneCash, fawry } = useSelector((state) => state?.payment);
  const { t } = useTranslation();
  const toaster = useToaster();
  const handelremove = async (params) => {
    try {
      const res = await dispatch(
        createOrUpdatePayment({
          payment: {
            ...params,
          },
        }),
      );
      if (res?.payload?.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('removed_successfuly')}
          </Message>,
          { duration: 5000 },
        );
        await dispatch(getPayment());
      } else {
        toaster.push(
          <Message type="error" closable showIcon>
            {res.payload.message}
          </Message>,
          { duration: 5000 },
        );
      }
    } catch (err) {
      toaster.push(
        <Message closable showIcon type="error">
          {t('internal_server_error')}
        </Message>,
        {
          duration: 5000,
        },
      );
    }
  };
  useEffect(() => {
    dispatch(getPayment());
  }, []);
  return (
    <article className="relative">
      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex gap-1 items-center">
            <span>
              <img src={viza} alt="viza" />
              <img src={masterCard} alt="masterCard" />
            </span>
            <span>{t('Credit_Card')}</span>
          </aside>
          <aside>
            <CreditCard />
          </aside>
        </div>
        <div className="bg-[var(--rs-gray-100)] px-3 text-center py-5 mt-3 text-start font-[500] text-[14px]">
          {!card ? (
            <article className="text-center">{t('You_dont_have_any_saved_method_details', { method: t('Credit_Card') })}</article>
          ) : (
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>
                {t('Card_Number')}: {card?.cardNumber}
                <br />
                cvc: {card?.cvc}
                <br />
                {t('Expire_Date')}: {card?.expireDate}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <a
                  className="text-red-500 underline hover:text-red-500 cursor-pointer"
                  onClick={() => handelremove({ card: '' })}
                >
                  {t('Remove')}
                </a>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          )}
        </div>
      </section>
      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex items-center gap-1">
            <img className="w-[20px]" src={vodafone} alt="vodafone" />
            <span className="mt-1">{t('Vodafone_Cash')}</span>
          </aside>
          <aside>
            <VodafonCash />
          </aside>
        </div>
        <div className="bg-[var(--rs-gray-100)] px-3 text-center py-5 mt-3 text-start font-[500] text-[14px]">
          {!vodafoneCash ? (
            <article className="text-center">
              {t('You_dont_have_any_saved_method_details', { method: t('Vodafone_Cash') })}
            </article>
          ) : (
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>
                {t('Phone')}: {vodafoneCash?.phone}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <a
                  className="text-red-500 underline hover:text-red-500 cursor-pointer"
                  onClick={() => handelremove({ vodafoneCash: '' })}
                >
                  {t('Remove')}
                </a>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          )}
        </div>
      </section>

      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex gap-1">
            <img className="w-[80px]" src={fawryImg} alt="fawry" />
            <span className="mt-[px]">{t('Fawry')}</span>
          </aside>
          <aside>
            <Fawry />
          </aside>
        </div>
        <div className="bg-[var(--rs-gray-100)] px-3 text-center py-5 mt-3 text-start font-[500] text-[14px]">
          {!fawry ? (
            <article className="text-center">{t('You_dont_have_any_saved_method_details', { method: t('Fawry') })}</article>
          ) : (
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>
                {t('Phone')}: {fawry?.phone}
                <br />
                {t('Email')}: {fawry?.email}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <a
                  className="text-red-500 underline hover:text-red-500 cursor-pointer"
                  onClick={() => handelremove({ fawry: '' })}
                >
                  {t('Remove')}
                </a>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          )}
        </div>
      </section>
    </article>
  );
}

export default PaymentInfo;
