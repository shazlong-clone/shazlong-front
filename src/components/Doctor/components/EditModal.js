import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FlexboxGrid,
  Form,
  IconButton,
  InputGroup,
  InputNumber,
  InputPicker,
  MaskedInput,
  Message,
  Modal,
  Radio,
  RadioGroup,
  Schema,
  Stack,
  TagPicker,
  useToaster,
} from 'rsuite';
import { MdOutlineEdit } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { genders } from '../../../assets/constants';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { getCountries, getLangs, getPrefix } from '../../../features/shared/sharedActions';
import { updateDoctorProfile } from '../../../features/doctor/doctorActions';
import { getMeAsDoctor } from '../../../features/auth/authAction';

function EditModal() {
  const { languages, prefixesList } = useSelector((state) => state?.shared);

  const {
    fullArName,
    fullEnName,
    prefix,
    email,
    phone,
    feez,
    countryCode,
    country,
    languages: doctorLang,
    gender,
  } = useSelector((state) => state?.doctor?.profile) ?? {};
  const formRef = useRef();

  const handleClose = () => setOpen(false);

  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [countryCodeState, setCountryCode] = useState(countryCode || '');

  const [formValue, setFormValue] = useState({
    fullArName: fullArName,
    fullEnName: fullEnName,
    prefix: prefix,
    email: email,
    phone: phone,
    country: country,
    languages: doctorLang,
    feez_per_30_min: feez?.at(0)?.amount,
    feez_per_60_min: feez?.at(1)?.amount,
    countryCode: countryCodeState,
    gender,
  });

  const { countries } = useSelector((state) => state?.shared);

  const [open, setOpen] = useState(false);

  const model = Schema.Model({
    fullArName: Schema.Types.StringType(),
    fullEnName: Schema.Types.StringType(),
    email: Schema.Types.StringType().isEmail('Not Valid Email'),
  });

  const handleOpen = () => setOpen(true);

  const prefixData = prefixesList?.map((el) => {
    return {
      label: el?.name,
      value: el?.id,
    };
  });

  const toaster = useToaster();

  const handleSubmit = async () => {
    if (!formRef.current.check()) return;
    const params = {
      ...formValue,
      feez: [
        { amount: formValue?.feez_per_30_min, duration: 30 },
        { amount: formValue?.feez_per_60_min, duration: 60 },
      ],
      countryCode: countryCodeState,
    };

    try {
      setLoading(true);
      const res = await dispatch(updateDoctorProfile(params));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('updated_successfuly')}
          </Message>,
          { duration: 2000 },
        );
        dispatch(getMeAsDoctor());
        setOpen(false);
      } else {
        toaster.push(
          <Message type="error" closable showIcon>
            {res.payload.message}
          </Message>,
          { duration: 2000 },
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
    } finally {
      setLoading(false);
    }
  };
  const countriesData = countries?.map((item) => ({
    label: (
      <div key={item?.id} className="flex gap-1">
        <span className={clsx(item?.country_flag, 'min-w-[1.3em]')} />
        <span>{item?.country_name}</span>
        <strong className="text-gray/25">{item?.country_code}</strong>
      </div>
    ),
    value: item?.id,
  }));

  const languagesData = languages?.map((el) => {
    return {
      label: i18n.resolvedLanguage === 'ar' ? el?.ar_name : el?.name,
      value: el?.id,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getLangs());
    dispatch(getPrefix());
  }, []);

  useEffect(() => {
    setCountryCode(countries?.find((el) => el?.id === country)?.country_code);
  }, [countryCode]);

  return (
    <>
      <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<MdOutlineEdit />} />
      <Modal backdrop="static" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('Edit_Pernsonal_Info')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: '0px', marginTop: '0px', padding: '0 5px' }}>
          <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
            <hr className="mx-0" />
            <Form.Group style={{ marginBottom: '5px' }} dir="rtl" controlId="ArabicName">
              <Form.HelpText>الاسم بالغة العربية</Form.HelpText>
              <Form.Control placeholder="الاسم بالغة العربية" block={'true'} name="fullArName" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} dir="ltr" controlId="English Name">
              <Form.HelpText>English Name</Form.HelpText>
              <Form.Control placeholder="English Name" block={'true'} name="fullEnName" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Email">
              <Form.HelpText>{t('Email')}</Form.HelpText>
              <Form.Control placeholder={t('Email')} block={'true'} name="email" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="country">
              <Form.ControlLabel>{t('Country')}</Form.ControlLabel>
              <Form.Control
                onSelect={(id) => {
                  setCountryCode(countries?.find((el) => el?.id === id)?.country_code);
                }}
                placeholder={t('Country')}
                menuMaxHeight={300}
                menuStyle={{ maxWidth: '10px' }}
                block
                name="country"
                accepter={InputPicker}
                data={countriesData}
                size="lg"
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Phone">
              <Form.HelpText>{t('Phone')}</Form.HelpText>
              <InputGroup>
                <InputGroup.Addon>{countryCodeState ?? '-'}</InputGroup.Addon>
                <Form.Control
                  accepter={MaskedInput}
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                  name="phone"
                  placeholder={t('Phone')}
                  size="lg"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="prefix">
              <Form.HelpText>{t('Prefix')}</Form.HelpText>
              <Form.Control data={prefixData} accepter={InputPicker} placeholder={t('Prefix')} block={'true'} name="prefix" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="languages">
              <Form.HelpText>{t('Languages')}</Form.HelpText>
              <Form.Control
                data={languagesData}
                accepter={TagPicker}
                placeholder={t('Languages')}
                block={'true'}
                name="languages"
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Feez30">
              <Form.HelpText>{t('Feez_Per_30_Minutes')}</Form.HelpText>
              <Form.Control
                prefix={t('30_Mins')}
                min={0}
                accepter={InputNumber}
                placeholder={t('Feez_Per_30_Minutes')}
                block={'true'}
                name="feez_per_30_min"
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Feez60">
              <Form.HelpText>{t('Feez_Per_60_Minutes')}</Form.HelpText>
              <Form.Control
                prefix={t('60_Mins')}
                min={0}
                accepter={InputNumber}
                placeholder={t('Feez_Per_60_Minutes')}
                block={'true'}
                name="feez_per_60_min"
              />
            </Form.Group>
            <Form.Group>
              <Form.HelpText>{t('Gender')}</Form.HelpText>
              <Form.Control name="gender" accepter={RadioGroup} inline>
                {genders?.map((el) => (
                  <Radio key={Math.random()} value={el?.id}>
                    {t(el?.name)}
                  </Radio>
                ))}
              </Form.Control>
            </Form.Group>
            <hr className="m-3 mx-0" />
            <FlexboxGrid justify="end">
              <Stack spacing={16}>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                <Button loading={loading} appearance="primary" onClick={handleSubmit} type="submit">
                  {t('Save')}
                </Button>
              </Stack>
            </FlexboxGrid>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;
