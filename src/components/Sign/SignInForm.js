import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Form, InputGroup, Schema } from 'rsuite';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const { Group, HelpText, Control } = Form;
function SignUpForm() {
  const [visible, setVisible] = useState(false);

  const model = Schema.Model({
    email: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
    password: Schema.Types.StringType().isRequired('This field is required'),
  });
  const [formValue, setFormValues] = useState({
    email: '',
    password: '',
  });
  const onSubmit = (isValid) => {
    if (!isValid) return;
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Form formValue={formValue} onChange={setFormValues} model={model} fluid className="mt-5 sign-form">
        <Group controlId="email">
          <Control size="lg" block="true" placeholder="Email" name="email" />
        </Group>
        <Group controlId="password" className="mb-0">
          <InputGroup>
            <Control size="lg" name="password" placeholder="Password" type={visible ? 'text' : 'password'} />
            <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
          </InputGroup>
          <HelpText>
            <Link to="/forgot-password">forgot password?</Link>
          </HelpText>
        </Group>

        <Group controlId="submit">
          <ButtonToolbar>
            <Button onClick={onSubmit} appearance="primary" type="submit" block startIcon={<FaLock />}>
              <strong className="pb-[1px] mx-[2px]">Sign In</strong>
            </Button>
          </ButtonToolbar>
        </Group>
        <div className="text-center mt-[-10px]">
          <Link to="/sign-up" className="underline">
            Dont Have Account Sign Up
          </Link>
        </div>
      </Form>
    </>
  );
}

export default SignUpForm;
