import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputGroup,
  InputPicker,
  Radio,
  RadioGroup,
  Schema,
} from 'rsuite';

import AOS from 'aos';
import 'aos/dist/aos.css';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
const { Group, HelpText, Control } = Form;
import { signUp } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';

function SignUpForm() {
  const dispatch = useDispatch();
  const [acceptLicence, setAcceptLicence] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConConfirm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('+20');
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

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired('This field is required.'),
    email: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
    password: Schema.Types.StringType().isRequired('This field is required'),
    password_confirm: Schema.Types.StringType().isRequired('This field is required'),
    country: Schema.Types.StringType().isRequired('This field is required'),
    phone: Schema.Types.NumberType().isRequired('This field is required'),
    gender: Schema.Types.StringType().isRequired('This field is required'),
    birthDate: Schema.Types.StringType().isRequired('This field is required'),
  });

  const [formValue, setFormValues] = useState({
    name: 'saeed',
    email: '',
    password: '',
    passwordConfirm: '',
    countryId: 2500,
    phone: '',
    gender: '',
    birthDate: moment(),
  });
  const onSubmit = async (isValid) => {
    if (!isValid) return;
    try {
      await dispatch(signUp({ email: 'email@x.com', password: 'sss' }));
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    fetch('/api/countries.json').then((res) => {
      res.json().then((resJosn) => {
        setCountries(resJosn);
      });
    });
    AOS.init();
  }, []);

  return (
    <>
      <Form formValue={formValue} onChange={setFormValues} model={model} fluid className="mt-5 sign-form">
        <Group controlId="name">
          <Control size="lg" placeholder="User Name" name="name" block="true" />
          <HelpText>You can use letters a-z, numbers and periods (- , _ , .)</HelpText>
        </Group>
        <Group controlId="email">
          <Control size="lg" block="true" placeholder="Email" name="email" />
        </Group>
        <Group controlId="password">
          <InputGroup>
            <Control size="lg" name="password" placeholder="Password" type={visible ? 'text' : 'password'} />
            <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
          </InputGroup>
        </Group>
        <Group controlId="passwordConfirm">
          <InputGroup accepter={InputGroup}>
            <Control
              placeholder="Password Confirm"
              size="lg"
              name="passwordConfirm"
              type={visibleConfirm ? 'text' : 'password'}
            />
            <InputGroup.Button onClick={() => setVisibleConConfirm(!visibleConfirm)}>
              {visibleConfirm ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
        </Group>
        <Group controlId="countryId">
          <Control
            onSelect={(id) => {
              setCountryCode(countries?.find((el) => el?.id === id)?.country_code);
            }}
            placeholder="Country"
            menuMaxHeight={300}
            menuStyle={{ maxWidth: '10px' }}
            block
            name="countryId"
            accepter={InputPicker}
            data={countriesData}
            size="lg"
          />
        </Group>
        <Group controlId="birthDate">
          <Control accepter={DatePicker} style={{ width: '100%' }} name="birthDate" block />
        </Group>
        <Group controlId="phone">
          <Control name="phone" accepter={InputGroup}>
            <InputGroup.Addon>{countryCode}</InputGroup.Addon>
            <Input placeholder="Phone Number" size="lg" />
          </Control>
        </Group>
        <Group controlId="gender">
          <Control accepter={RadioGroup} name="gender" inline>
            <Radio value="1">Male</Radio>
            <Radio value="2">Female</Radio>
          </Control>
        </Group>
        <Group controlId="acceptLicence" className="ml-[-10px]">
          <Control
            onChange={(val, checked) => {
              setAcceptLicence(checked);
            }}
            accepter={Checkbox}
            name="acceptLicence"
          >
            I agree with the
            <Link to="/licence" className="underline">
              privacy policy
            </Link>
          </Control>
        </Group>
        <Group controlId="submit">
          <ButtonToolbar>
            <Button disabled={!acceptLicence} onClick={onSubmit} appearance="primary" type="submit" block startIcon={<FaLock />}>
              <strong className="pb-[1px] mx-[2px]">Sign Up</strong>
            </Button>
          </ButtonToolbar>
        </Group>
        <div className="text-center mt-[-10px]">
          <Link to="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </Form>
    </>
  );
}

export default SignUpForm;
