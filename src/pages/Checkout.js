import React, { useEffect, useMemo, useState } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import { Avatar, Button, Divider, Form, IconButton, Input, Message, toaster } from 'rsuite';
import person from '../assets/images/person.png';
import Card from '../components/Shared/Card';
import { LuAlarmClock, LuCopy } from 'react-icons/lu';
import { GiCash } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { RadioTile, RadioTileGroup } from 'rsuite';
import visa_new from '../assets/images/visa_new.png';
import master_card_new from '../assets/images/master_card_new.svg';
import we from '../assets/images/we_icon.svg';
import orange from '../assets/images/orange_icon.svg';
import { FaCheck } from 'react-icons/fa6';
import etisalat_icon from '../assets/images/etisalat_icon.svg';
import fawry from '../assets/images/fawry.png';
import vodafon from '../assets/images/Vodafone_icon.png';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import clsx from 'clsx';
import useMediaQuery from '../hooks/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import Empty from '../components/Shared/Empty';
import { useTranslation } from 'react-i18next';
import { getPrefix, getSlotsByIds } from '../features/shared/sharedActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { transctionFeez, discount, couponCode, CRIDIT_CARD, PHONE_CASH, FAWRY } from '../assets/constants';
import Payment from '../components/Checkout/Payment';

function Checkout() {
  const { t, i18n } = useTranslation();
  const [textCopied, setTextCopied] = useState(false);
  const [coupon, setCoupon] = useState('');
  const payMentMethods = [
    {
      icon: (
        <div>
          <img src={visa_new} alt="visa_new" />
          <img src={master_card_new} alt="master_card_new" />
        </div>
      ),
      label: t('Credit_Card'),
      value: CRIDIT_CARD,
    },
    {
      icon: (
        <div className="flex gap-1 items-center">
          <img className="w-6 h-6" src={vodafon} alt="vodafon" />
          <img src={we} alt="we" />
          <img src={orange} alt="orange" />
          <img src={etisalat_icon} alt="etisalat_icon" />
        </div>
      ),
      label: t('Vodafone_Cash'),
      value: PHONE_CASH,
    },
    {
      icon: <img className="w-16" src={fawry} alt="fawry" />,
      label: t('Fawry'),
      value: FAWRY,
    },
  ];
  const [paymentMethod, setPaymentMethod] = useState(payMentMethods[0].value);
  const [openCpllapse, setOpenCpllapse] = useState(false);
  const lg = useMediaQuery('lg');
  const [searchParams] = useSearchParams();
  const slots_ids = searchParams.get('slots_ids');
  const navigate = useNavigate();
  const dicpatch = useDispatch();
  const { checkoutSlots = [], prefixesList = [] } = useSelector((state) => state?.shared);
  const doctor = useMemo(() => {
    return checkoutSlots?.at(0)?.doctor;
  }, [checkoutSlots]);

  const instruction = [
    t('Instruction_1'),
    t('Instruction_2'),
    t('Instruction_3'),
    <>
      {t('Instruction_4')}
      <Link className="underline" to={`/${i18n.resolvedLanguage}/instructions`}>
        {t('Here')}
      </Link>
    </>,
    t('Instruction_5'),
    t('Instruction_6'),
    t('Instruction_7'),
  ];
  const [discountState, setDiscount] = useState(0);

  const handelCopon = () => {
    if (!coupon) {
      toaster.push(
        <Message closable showIcon type="error">
          {t('Enter_Coupon_Code')}
        </Message>,
      );
      return;
    }
    if (coupon === couponCode) {
      setDiscount(discount);
      toaster.push(
        <Message closable showIcon type="success">
          {t('Coupon_Applied')}
        </Message>,
      );
    } else {
      toaster.push(
        <Message closable showIcon type="error">
          {t('Invalid_Coupon')}
        </Message>,
      );
      setDiscount(0);
    }
  };
  const getFeez = (from, to) => {
    return doctor?.feez?.find((feezItem) => {
      return moment(to).diff(moment(from), 'minutes') == feezItem?.duration;
    })?.amount;
  };
  const handelCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setTextCopied(true);
  };
  const subTotal = useMemo(() => {
    return checkoutSlots?.reduce((prevSlot, currSlot) => {
      return prevSlot + getFeez(currSlot?.from, currSlot?.to);
    }, 0);
  }, [checkoutSlots]);

  useEffect(() => {
    if (slots_ids) {
      dicpatch(getSlotsByIds(slots_ids));
    }
    dicpatch(getPrefix());
  }, []);

  if (!slots_ids) {
    return (
      <div className="flex items-center flex-col  min-h-[calc(100vh_-_353px_-128px_-24px_-48px_-1px)] justify-center">
        <Empty message={t('Checkout_No_Slots')} />
        <Button className="mt-5" onClick={() => navigate(-1)} appearance="primary">
          {t('Selcet_Slot_Again')}
        </Button>
      </div>
    );
  }

  return (
    <main className="bg-[var(--rs-gray-50)] py-5">
      <div className="container">
        <InternalHeader link={`/${i18n.resolvedLanguage}/thearpist-profile/${doctor?._id}`}>{t('Check_Out')}</InternalHeader>
      </div>
      <div className="container grid gap-5 lg:grid-cols-2 items-start">
        <Card className="mb-0">
          <section className="flex gap-2 items-center lg:gap-5">
            <Link to={`/${i18n.resolvedLanguage}/thearpist-profile/${doctor?._id}`}>
              <Avatar size={lg ? 'lg' : 'md'} circle src={doctor?.photo || person} alt="img" />
            </Link>
            <aside>
              <div className="capitalize font-medium">
                {i18n.resolvedLanguage === 'ar' ? doctor?.fullArName : doctor?.fullEnName}
              </div>
              <div className="text-cyan text-xs lg:text-base">
                {i18n.resolvedLanguage === 'ar'
                  ? prefixesList?.find((prefix) => prefix?.id === doctor?.prefix)?.ar_name
                  : prefixesList?.find((prefix) => prefix?.id === doctor?.prefix)?.name}
              </div>
            </aside>
          </section>
          <section className="my-4">
            {checkoutSlots?.map((slot) => {
              return (
                <Card key={Math.random()} className=" bg-[var(--rs-gray-100)] rounded-lg p-2 mb-0 mt-2 grid gap-2">
                  <article className="flex gap-2 items-center">
                    <LuAlarmClock className="text-xl text-cyan" />
                    <aside className="text-[17px]">
                      {`${moment(slot?.from).format('ddd DD')} ( ${t('From')} ${moment(slot?.from).format('hh:mm a')} ${t(
                        'To',
                      )} ${moment(slot?.to).format('hh:mm a')} )`}
                    </aside>
                  </article>
                  <article className="flex gap-2 items-center">
                    <GiCash className="text-xl text-cyan" />
                    <aside className="font-semibold text-[17px]">{`${getFeez(slot?.from, slot?.to)} ${t('Egy')}`}</aside>
                  </article>
                </Card>
              );
            })}
          </section>
          <section>
            <h5 className="my-3 text-gray/80 text-center">{t('coupon')}</h5>
            <article className="flex gap-2">
              <Input
                disabled={discountState}
                value={coupon}
                onChange={(v) => setCoupon(v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Cancel the default action, if needed
                    e.preventDefault();
                    // Trigger the button element with a click
                    handelCopon();
                  }
                }}
                placeholder={t('coupon')}
              />
              {discountState ? (
                <IconButton ripple={false} appearance="primary" color="green" icon={<FaCheck />} circle />
              ) : (
                <Button appearance="primary" onClick={handelCopon}>
                  {t('Apply')}
                </Button>
              )}
            </article>
            <article className="flex gap-2 mt-2 items-center">
              {!discountState ? (
                <>
                  <Form.HelpText>{t('Demo_Coupon', { coupon: couponCode })}</Form.HelpText>
                  {textCopied ? (
                    <FaCheck className="text-sm text-cyan text-green-300" />
                  ) : (
                    <LuCopy
                      className="cursor-pointer hover:text-[var(--rs-primary-500)] text-[var(--rs-primary-300)]"
                      onClick={handelCopy}
                    />
                  )}
                </>
              ) : (
                <Form.HelpText className="text-green-500">{t('Coupon_Applied')}</Form.HelpText>
              )}
            </article>
          </section>
          <section className="mt-3 grid gap-2 capitalize">
            <article className="flex justify-between">
              <span>{t('Subtotal', { count: checkoutSlots?.length || 1 })}</span>
              <span>{`${subTotal} ${t('Egy')}`}</span>
            </article>
            <article className="flex justify-between">
              <span>{t('Transction_Feez')}</span>
              <span>
                {transctionFeez} {t('Egy')}
              </span>
            </article>
            <article className="flex justify-between">
              <span>{t('Discount')}</span>
              <span>{`${discountState} ${t('Egy')}`}</span>
            </article>
            <Divider />
            <article className="flex justify-between font-bold">
              <span>{t('Total')}</span>
              <span>
                {subTotal + transctionFeez - discountState} {t('Egy')}
              </span>
            </article>
          </section>
        </Card>
        <Card className="radio-card my-0">
          <h5 className="mb-6 text-gray/80 text-center">{t('Payment_Method')}</h5>
          <RadioTileGroup value={paymentMethod} aria-label="Visibility Level" className="check-meth">
            {payMentMethods?.map((paymentMethodItem) => {
              const { icon, label, value } = paymentMethodItem;
              return (
                <RadioTile
                  onClick={() => setPaymentMethod(value)}
                  key={Math.random()}
                  icon={icon}
                  label={label}
                  value={value}
                  className="h-[70px]"
                />
              );
            })}
          </RadioTileGroup>
          <Payment data={{ subTotal, transctionFeez, discountState, paymentMethod }} />
        </Card>
        <Card>
          <h5 className="grid grid-cols-[1fr_auto] items-center mb-5">
            <span>{t('How_to_get_the_best_session_experience?')}</span>
            <IconButton
              onClick={() => setOpenCpllapse(!openCpllapse)}
              className="rounded-full"
              icon={openCpllapse ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
            />
          </h5>
          <div>
            <ul className={clsx('px-0 list-none grid gap-2 text-sm lg:text-base', !openCpllapse && 'hidden h-0')}>
              {instruction?.map((el) => {
                return (
                  <li key={Math.random()} className="font-[500]">
                    {el}
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      </div>
    </main>
  );
}

export default Checkout;
