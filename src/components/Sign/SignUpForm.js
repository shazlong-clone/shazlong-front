import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputGroup,
  InputPicker,
  Message,
  Panel,
  Radio,
  RadioGroup,
  Schema,
  useToaster,
} from 'rsuite';
import { JSONTree } from 'react-json-tree';

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
import JSONView from '../Shared/JSONView';
import { useTranslation } from 'react-i18next';

function SignUpForm() {
  const { t } = useTranslation();
  const toaster = useToaster();
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
    passwordConfirm: Schema.Types.StringType().isRequired('This field is required'),
    countryId: Schema.Types.NumberType().isRequired('This field is required'),
    phone: Schema.Types.StringType().isRequired('This field is required'),
    gender: Schema.Types.StringType().isRequired('This field is required'),
    birthDate: Schema.Types.DateType().isRequired('This field is required'),
  });

  const [formValue, setFormValues] = useState({
    name: 'saeed',
    email: 'nnowyan@gmail.com',
    password: '111111',
    passwordConfirm: '111111',
    countryId: 2500,
    phone: '1009649295',
    gender: '1',
    birthDate: new Date(),
    role: 1,
  });
  const formRef = useRef();

  const [formError, setFormError] = React.useState({});
  const handleSubmit = async () => {
    try {
      const res = await dispatch(signUp(formValue));
      if (res?.status) {
        toaster.push(
          <Message closable showIcon type="success">
            Singed Up{' '}
          </Message>,
          {
            duration: 5000,
          },
        );
      } else {
        toaster.push(
          <Message closable showIcon type="error">
            {res?.payload?.message}
          </Message>,
          {
            duration: 5000,
          },
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
    fetch('/api/countries.json').then((res) => {
      res.json().then((resJosn) => {
        setCountries(resJosn);
      });
    });
    AOS.init();
  }, []);

  return (
    <>
      <Form
        ref={formRef}
        onCheck={setFormError}
        formValue={formValue}
        onChange={setFormValues}
        model={model}
        fluid
        className="mt-5 sign-form"
      >
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
          <InputGroup>
            <InputGroup.Addon>{countryCode}</InputGroup.Addon>
            <Control name="phone" placeholder="Phone Number" size="lg" />
          </InputGroup>
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
            <Button
              disabled={!acceptLicence}
              onClick={handleSubmit}
              appearance="primary"
              type="submit"
              block
              startIcon={<FaLock />}
            >
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
      <JSONView formValue={formValue} formError={formError} />
    </>
  );
}

export default SignUpForm;
