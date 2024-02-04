import React, { useEffect, useMemo, useRef, useState } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import { Avatar, Button, Divider, IconButton, Input } from 'rsuite';
import person from '../assets/images/person.png';
import Card from '../components/Shared/Card';
import { LuAlarmClock } from 'react-icons/lu';
import { GiCash } from 'react-icons/gi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RadioTile, RadioTileGroup } from 'rsuite';
import visa_new from '../assets/images/visa_new.png';
import master_card_new from '../assets/images/master_card_new.svg';
import we from '../assets/images/we_icon.svg';
import orange from '../assets/images/orange_icon.svg';
import etisalat_icon from '../assets/images/etisalat_icon.svg';
import fawry from '../assets/images/fawry.png';
import vodafon from '../assets/images/Vodafone_icon.png';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import clsx from 'clsx';
import useMediaQuery from '../utils/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import Empty from '../components/Shared/Empty';
import { useTranslation } from 'react-i18next';
import { getPrefix, getSlotsByIds } from '../features/shared/sharedActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { transctionFeez, discount, couponCode } from '../assets/constants';

function Checkout() {
  const [openCpllapse, setOpenCpllapse] = useState(false);
  const lg = useMediaQuery('lg');
  const { t, i18n } = useTranslation();
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
      <Link className="underline" to="/instructions">
        {t('Here')}
      </Link>
    </>,
    t('Instruction_5'),
    t('Instruction_6'),
    t('Instruction_7'),
  ];
  const couponRef = useRef();
  const [discountState, setDiscount] = useState(0);
  const handelCopon = () => {
    if (couponRef.current.value === couponCode) {
      setDiscount(discount);
    } else {
      setDiscount(0);
    }
  };
  const getFeez = (from, to) => {
    return doctor?.feez?.find((feezItem) => {
      return moment(to).diff(moment(from), 'minutes') == feezItem?.duration;
    })?.amount;
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
        <InternalHeader link={`/thearpist-profile/${doctor?._id}`}>{t('Check_Out')}</InternalHeader>
      </div>
      <div className="container grid gap-5 lg:grid-cols-2 items-start">
        <Card className="mb-0">
          <section className="flex gap-2 items-center lg:gap-5">
            <Link to={`/thearpist-profile/${doctor?._id}`}>
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
                    <aside className="text-sm">
                      {`${moment(slot?.from).format('ddd DD')} ( ${t('From')} ${moment(slot?.from).format('hh:mm a')} ${t(
                        'To',
                      )} ${moment(slot?.to).format('hh:mm a')} )`}
                    </aside>
                  </article>
                  <article className="flex gap-2 items-center">
                    <GiCash className="text-xl text-cyan" />
                    <aside className="font-semibold text-sm">{`${getFeez(slot?.from, slot?.to)} ${t('Egy')}`}</aside>
                  </article>
                </Card>
              );
            })}
          </section>
          <section>
            <h5 className="my-3 text-gray/80 text-center">{t('coupon')}</h5>
            <article className="flex gap-2">
              <Input
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Cancel the default action, if needed
                    e.preventDefault();
                    // Trigger the button element with a click
                    handelCopon();
                  }
                }}
                ref={couponRef}
                placeholder={t('coupon')}
              />
              <Button appearance="primary" onClick={handelCopon}>
                {t('Apply')}
              </Button>
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
          <RadioTileGroup defaultValue="private" aria-label="Visibility Level" className="check-meth">
            <RadioTile
              icon={
                <div>
                  <img src={visa_new} alt="visa_new" />
                  <img src={master_card_new} alt="master_card_new" />
                </div>
              }
              label={t('Credit_Card')}
              value="private"
              className="h-[70px]"
            ></RadioTile>
            <RadioTile
              icon={
                <div className="flex gap-1 items-center">
                  <img className="w-6 h-6" src={vodafon} alt="vodafon" />
                  <img src={we} alt="we" />
                  <img src={orange} alt="orange" />
                  <img src={etisalat_icon} alt="etisalat_icon" />
                </div>
              }
              label={t('Vodafone_Cash')}
              value="internal"
              className="h-[70px]"
            />

            <RadioTile
              icon={<img className="w-16" src={fawry} alt="fawry" />}
              label={t('Fawry')}
              value="public"
              className="h-[70px]"
            />
          </RadioTileGroup>
          <Button block className="font-[500] mt-3" appearance="primary">
            {t('Pay')} <span className="font-bold px-2">{subTotal + transctionFeez - discountState}</span>
            {t('Egy')}
          </Button>
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
