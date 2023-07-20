import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  CheckboxGroup,
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
function SignUpForm() {
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConConfirm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('+20');
  const countriesData = countries?.map((item) => ({
    label: (
      <div key={item?.country_code} className="flex gap-1">
        <span className={clsx(item?.country_flag, 'min-w-[1.3em]')} />
        <span>{item?.country_name}</span>
        <strong className="text-gray/25">{item?.country_code}</strong>
      </div>
    ),
    value: item?.country_code,
  }));

  const model = Schema.Model({
    user_name: Schema.Types.StringType().isRequired('This field is required.'),
    email: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
    password: Schema.Types.StringType().isRequired('This field is required'),
    password_confirm: Schema.Types.StringType().isRequired('This field is required'),
    country: Schema.Types.StringType().isRequired('This field is required'),
    phone: Schema.Types.NumberType().isRequired('This field is required'),
    gender: Schema.Types.StringType().isRequired('This field is required'),
    accept_licence: Schema.Types.StringType().isRequired('This field is required'),
  });
  const [formValue, setFormValues] = useState({
    user_name: '',
    email: '',
    password: '',
    password_confirm: '',
    country: '+20',
    phone: '',
    gender: '',
    accept_licence: '',
  });
  const onSubmit = (isValid) => {
    if (!isValid) return;
  };
  useEffect(() => {
    fetch('/countries.json').then((res) => {
      res.json().then((resJosn) => {
        setCountries(resJosn);
      });
    });
    AOS.init();
  }, []);
  return (
    <>
      <Form formValue={formValue} onChange={setFormValues} model={model} fluid className="mt-5 sign-form">
        <Group controlId="user_name">
          <Control size="lg" placeholder="User Name" name="user_name" block />
          <HelpText>You can use letters a-z, numbers and periods (- , _ , .)</HelpText>
        </Group>
        <Group controlId="email">
          <Control size="lg" block placeholder="Email" name="email" />
          <HelpText>*Email is required</HelpText>
        </Group>
        <Group controlId="password">
          <InputGroup>
            <Control size="lg" inside name="password" placeholder="Password" type={visible ? 'text' : 'password'} />
            <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
          </InputGroup>
        </Group>
        <Group controlId="password_confirm">
          <InputGroup accepter={InputGroup}>
            <Control
              placeholder="Password Confirm"
              size="lg"
              name="password_confirm"
              inside
              type={visibleConfirm ? 'text' : 'password'}
            />
            <InputGroup.Button onClick={() => setVisibleConConfirm(!visibleConfirm)}>
              {visibleConfirm ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
        </Group>
        <Group controlId="country">
          <Control
            onSelect={setCountryCode}
            placeholder="Country"
            menuMaxHeight={300}
            menuStyle={{ maxWidth: '10px' }}
            block
            name="country"
            accepter={InputPicker}
            data={countriesData}
            size="lg"
          />
        </Group>
        <Group controlId="phone">
          <Control name="phone" accepter={InputGroup}>
            <InputGroup.Addon>{countryCode}</InputGroup.Addon>
            <Input placeholder="Phone Number" size="lg" />
          </Control>
          <HelpText> * Please make sure you enter a valid phone number </HelpText>
        </Group>
        <Group controlId="gender">
          <Control accepter={RadioGroup} name="gender" inline>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Control>
        </Group>
        <Group controlId="accept_licence">
          <Control accepter={CheckboxGroup}>
            <Checkbox name="accept_licence">
              I agree with the <Link> privacy policy</Link>{' '}
            </Checkbox>
          </Control>
        </Group>
        <Group controlId="submit">
          <ButtonToolbar>
            <Button onClick={onSubmit} appearance="primary" type="submit" block={<FaLock />}>
              <strong className="pb-[1px] mx-[2px]">Sign Up</strong>
            </Button>
          </ButtonToolbar>
        </Group>
        <div className="text-center mt-[-10px]">
          <Link to="sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </Form>
    </>
  );
}

export default SignUpForm;
