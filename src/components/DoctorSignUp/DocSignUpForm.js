import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Checkbox, Form, InputGroup, InputPicker, Schema } from 'rsuite';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
const { Group, HelpText, Control } = Form;
function DocSignUpForm() {
  const [acceptLicence, setAcceptLicence] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConConfirm] = useState(false);
  const [countries, setCountries] = useState([]);
  const countriesData = countries?.map((item) => ({
    label: (
      <div key={item?.id} className="flex gap-1">
        <span className={clsx(item?.country_flag, 'min-w-[1.3em]')} />
        <span>{item?.country_name}</span>
      </div>
    ),
    value: item?.id,
  }));

  const model = Schema.Model({
    user_name: Schema.Types.StringType().isRequired('This field is required.'),
    email: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
    password: Schema.Types.StringType().isRequired('This field is required'),
    password_confirm: Schema.Types.StringType().isRequired('This field is required'),
    country_id: Schema.Types.NumberType().isRequired('This field is required'),
  });
  const [formValue, setFormValues] = useState({
    user_name: '',
    email: '',
    password: '',
    password_confirm: '',
    country_id: '',
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
          <Control size="lg" placeholder="User Name *" name="user_name" block="true" />
          <HelpText>You can use letters a-z, numbers and periods (- , _ , .)</HelpText>
        </Group>
        <Group controlId="email">
          <Control size="lg" block="true" placeholder="Email *" name="email" />
        </Group>
        <Group controlId="country_id">
          <Control
            placeholder="Country *"
            menuMaxHeight={300}
            menuStyle={{ maxWidth: '10px' }}
            block
            name="country_id"
            accepter={InputPicker}
            data={countriesData}
            size="lg"
          />
        </Group>
        <Group controlId="password">
          <InputGroup>
            <Control size="lg" name="password" placeholder="Password *" type={visible ? 'text' : 'password'} />
            <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
          </InputGroup>
        </Group>
        <Group controlId="password_confirm">
          <InputGroup accepter={InputGroup}>
            <Control
              placeholder="Password Confirm *"
              size="lg"
              name="password_confirm"
              type={visibleConfirm ? 'text' : 'password'}
            />
            <InputGroup.Button onClick={() => setVisibleConConfirm(!visibleConfirm)}>
              {visibleConfirm ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
        </Group>

        <Group controlId="accept_licence" className="ml-[-10px]">
          <Control
            onChange={(val, checked) => {
              setAcceptLicence(checked);
            }}
            accepter={Checkbox}
            name="accept_licence"
          >
            I agree with the <Link to="/licence"> privacy policy</Link>
          </Control>
        </Group>
        <Group controlId="submit">
          <ButtonToolbar>
            <Button disabled={!acceptLicence} onClick={onSubmit} appearance="primary" type="submit" block startIcon={<FaLock />}>
              <strong className="pb-[1px] mx-[2px]">Register</strong>
            </Button>
          </ButtonToolbar>
        </Group>
      </Form>
    </>
  );
}

export default DocSignUpForm;
