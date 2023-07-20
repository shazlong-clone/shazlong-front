import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/shezlong-logo.svg';
import { Button, ButtonToolbar, Checkbox, CheckboxGroup, Form, Input, InputGroup, InputPicker, Radio, RadioGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import undraw_sign_up from '../../assets/images/undraw_sign_up.svg';
const { Group, HelpText, Control } = Form;
function SignUpForm() {
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConConfirm] = useState(false);
  const [countries, setCountries] = useState([]);

  const selectData = countries?.map((item) => ({
    label: (
      <div key={item?.country_code} className="flex gap-1">
        <span className={clsx(item?.country_flag, 'min-w-[1.3em]')} />
        <span>{item?.country_name}</span>
        <strong className="text-gray/25">{item?.country_code}</strong>
      </div>
    ),
    value: item?.country_code,
  }));

  useEffect(() => {
    fetch('/countries.json').then((res) => {
      res.json().then((resJosn) => {
        setCountries(resJosn);
      });
    });
  }, []);

  return (
    <main className="lg:px-0 lg:w-full">
      <div className="lg:grid lg:grid-cols-[1fr_1.5fr] items-start">
        <section className="mb-5 mx-auto lg:max-w-sm py-10 lg:py-0 container">
          <div className="text-center">
            <img width="70%" src={logo} alt="/" />
            <strong className="mt-8 block">All fields marked with * are required</strong>
          </div>
          <Form fluid className="mt-5 sign-form">
            <Group controlId="user_name">
              <Control size="lg" placeholder="User Name" name="user_name" block />
              <HelpText>You can use letters a-z, numbers and periods (- , _ , .)</HelpText>
            </Group>
            <Group controlId="email">
              <Control size="lg" block placeholder="Email" name="email" type="email" />
              <HelpText>*Email is required</HelpText>
            </Group>
            <Group controlId="password">
              <Control size="lg" inside name="password" accepter={InputGroup}>
                <Input placeholder="Password" type={visible ? 'text' : 'password'} />
                <InputGroup.Button onClick={() => setVisible(!visible)}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </Control>
            </Group>
            <Group controlId="password_confirm">
              <Control size="lg" inside name="password_confirm" accepter={InputGroup}>
                <Input placeholder="Password Confirm" type={visibleConfirm ? 'text' : 'password'} />
                <InputGroup.Button onClick={() => setVisibleConConfirm(!visibleConfirm)}>
                  {visibleConfirm ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </Control>
            </Group>
            <Group controlId="country">
              <Control
                placeholder="Country"
                menuMaxHeight={300}
                menuStyle={{ maxWidth: '10px' }}
                block
                name="country"
                accepter={InputPicker}
                data={selectData}
                size="lg"
              />
            </Group>
            <Group>
              <Control name="phone" accepter={InputGroup}>
                <InputGroup.Addon>+20</InputGroup.Addon>
                <Input placeholder="Phone Number" type="number" size="lg" />
              </Control>
              <HelpText> * Please make sure you enter a valid phone number </HelpText>
            </Group>
            <Group controlId="radioList">
              <Control accepter={RadioGroup} name="gender" inline>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Control>
            </Group>
            <Group>
              <Control accepter={CheckboxGroup}>
                <Checkbox name="licence">
                  I agree with the <Link> privacy policy</Link>{' '}
                </Checkbox>
              </Control>
            </Group>
            <Group>
              <ButtonToolbar>
                <Button appearance="primary" block={<FaLock />}>
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
        </section>
        <section className="relative">
          <img
            className="max-w-full w-full  lg:h-[100vh] object-cover backdrop-blur-sm"
            src="https://www.shezlong.com/en/road-bg.a4abe39e13ffffee.jpg"
            alt="undraw_sign_up"
          />
          <article className="absolute top-0 left-0 bg-gray/20 h-full w-full text-white text-center">
            <h1 className="flex items-center h-full justify-center lg:max-w-lg lg:m-auto xl:w-full">
              {' '}
              A journey of a thousand miles begins with a single step{' '}
            </h1>
          </article>
        </section>
      </div>
    </main>
  );
}

export default SignUpForm;
