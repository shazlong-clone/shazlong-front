import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FlexboxGrid,
  Form,
  IconButton,
  InputGroup,
  InputNumber,
  InputPicker,
  Modal,
  Schema,
  Stack,
  TagPicker,
} from 'rsuite';
import { MdOutlineEdit } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { egyptGovernorates, prefixList } from '../../../assets/constants';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { getCountries, getLangs } from '../../../features/shared/sharedActions';

function EditModal() {
  const {
    doctor: { fullArName, fullEnName, prefix, email, address, phone, feez, countryCode, country, languages: doctorLang },
  } = useSelector((state) => state?.auth);
  const formRef = useRef();
  const handleClose = () => setOpen(false);
  const { i18n } = useTranslation();
  const [formValue, setFormValue] = useState({
    fullArName: fullArName,
    fullEnName: fullEnName,
    prefix: prefix,
    email: email,
    address: address,
    phone: phone,
    country: country,
    languages: doctorLang,
    feez_per_30_min: feez?.at(0)?.amount,
    feez_per_60_min: feez?.at(1)?.amount,
  });
  const model = Schema.Model({
    interstes: Schema.Types.ArrayType().isRequired('This field is required.'),
  });
  const [countryCodeState, setCountryCode] = useState(countryCode || '');
  const { countries } = useSelector((state) => state?.shared);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const egyptGovernoratesData = egyptGovernorates?.map((el) => {
    return {
      label: i18n.resolvedLanguage === 'ar' ? el?.ar_name : el?.name,
      value: el?.id,
    };
  });
  const prefixData = prefixList?.map((el) => {
    return {
      label: el,
      value: el,
    };
  });
  const handleSubmit = () => {
    if (!formRef.current.check()) return;
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
  const { languages } = useSelector((state) => state?.shared);
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
  }, []);

  return (
    <>
      <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<MdOutlineEdit />} />
      <Modal backdrop="static" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Pernsonal Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: '0px', marginTop: '0px', padding: '0 5px' }}>
          <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
            <hr className="m-2 mx-0" />
            <Form.Group style={{ marginBottom: '5px' }} dir="rtl" controlId="ArabicName">
              <Form.HelpText>الاسم بالغة العربية</Form.HelpText>
              <Form.Control placeholder="الاسم بالغة العربية" block name="fullArName" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} dir="ltr" controlId="English Name">
              <Form.HelpText>English Name</Form.HelpText>
              <Form.Control placeholder="English Name" block name="fullEnName" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Email">
              <Form.HelpText>Email</Form.HelpText>
              <Form.Control placeholder="Enter Email" block name="email" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Address">
              <Form.HelpText>Address</Form.HelpText>
              <Form.Control
                data={egyptGovernoratesData}
                accepter={InputPicker}
                placeholder="Enter Address"
                block
                name="address"
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="country">
              <Form.ControlLabel>Country</Form.ControlLabel>
              <Form.Control
                onSelect={(id) => {
                  setCountryCode(countries?.find((el) => el?.id === id)?.country_code);
                }}
                placeholder="Country"
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
              <Form.HelpText>Phone</Form.HelpText>
              <InputGroup>
                <InputGroup.Addon>{countryCodeState ?? '-'}</InputGroup.Addon>
                <Form.Control name="phone" placeholder="Phone" size="lg" />
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="prefix">
              <Form.HelpText>prefix</Form.HelpText>
              <Form.Control data={prefixData} accepter={InputPicker} placeholder="Enter Prefix" block name="prefix" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="languages">
              <Form.HelpText>Languages</Form.HelpText>
              <Form.Control data={languagesData} accepter={TagPicker} placeholder="Enter lang" block name="languages" />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Feez30">
              <Form.HelpText>Feez Per 30 minutes</Form.HelpText>
              <Form.Control
                prefix="30 mins"
                min={0}
                accepter={InputNumber}
                placeholder="Enter Feez Per 30 minutes"
                block
                name="feez_per_30_min"
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }} controlId="Feez60">
              <Form.HelpText>Feez Per 60 minutes</Form.HelpText>
              <Form.Control
                prefix="60 mins"
                min={0}
                accepter={InputNumber}
                placeholder="Enter Feez Per 60 minutes"
                block
                name="feez_per_60_min"
              />
            </Form.Group>
            <hr className="m-3 mx-0" />
            <FlexboxGrid justify="end">
              <Stack spacing={16}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button appearance="primary" onClick={handleSubmit} type="submit">
                  Save
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
