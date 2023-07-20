import React, { useEffect, useState } from 'react';
import logo from '../assets/images/shezlong-logo.svg';
import { Button, ButtonToolbar, Form, Input, InputGroup, InputPicker } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import clsx from 'clsx';
const { Group, HelpText, Control } = Form;
function SignUp() {
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
    <main className="bg-gray/5 min-h-[100vh] py-5">
      <div className="container">
        <div className="text-center">
          <img width="70%" src={logo} alt="/" />
          <strong className="mt-8 block">All fields marked with * are required</strong>
        </div>
        <Form fluid className="mt-5 w-full sign-form">
          <Group controlId="user_name">
            <Control size="lg" placeholder="User Name" name="user_name" block />
            <HelpText>
              <small>You can use letters a-z, numbers and periods (- , _ , .) </small>
            </HelpText>
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
          <Group controlId="inputPicker">
            <Control
              placeholder="Country"
              menuMaxHeight={300}
              menuStyle={{ maxWidth: '10px' }}
              block
              name="inputPicker"
              accepter={InputPicker}
              data={selectData}
              size="lg"
            />
            <HelpText> * Please make sure you enter a valid phone number </HelpText>
          </Group>
          <Group>
            <ButtonToolbar>
              <Button appearance="primary">Submit</Button>
              <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
          </Group>
        </Form>
      </div>
    </main>
  );
}

export default SignUp;
