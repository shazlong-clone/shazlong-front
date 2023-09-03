import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonToolbar, Checkbox, Form, InputGroup, Message, Schema, useToaster } from 'rsuite';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import JSONview from '../Shared/JSONView';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
const { Group, HelpText, Control } = Form;
function SignUpForm() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [acceptLiecence, setAcceptLicence] = useState(false);
  const navigate = useNavigate();
  const model = Schema.Model({
    email: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
    password: Schema.Types.StringType().isRequired('This field is required'),
  });
  const [formValue, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toaster = useToaster();
  const onSubmit = async () => {
    if (!formRef.current.check()) return;
    try {
      setLoading(true);
      const res = await dispatch(signInUser(formValue));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('sign_in_successfuly')}
          </Message>,
          { duration: 5000 },
        );
        navigate('/');
      } else {
        toaster.push(
          <Message type="error" closable showIcon>
            {res.payload.message}
          </Message>,
          { duration: 5000 },
        );
      }
    } catch (err) {
      console.log(err);
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
  useEffect(() => {
    AOS.init();
  }, []);
  const formRef = useRef();
  const [formError, setFormError] = useState();
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
            <Button
              loading={loading}
              disabled={!acceptLiecence || loading}
              onClick={onSubmit}
              appearance="primary"
              type="submit"
              block
              startIcon={<FaLock />}
            >
              <strong className="pb-[1px] mx-[2px]">Sign In</strong>
            </Button>
          </ButtonToolbar>
        </Group>
      </Form>
      <Checkbox
        onChange={(val, checked) => {
          setAcceptLicence(checked);
        }}
      >
        I agree with the <Link to="/licence"> privacy policy</Link>{' '}
      </Checkbox>
      <div className="text-center mt-5">
        <Link to="/sign-up" className="underline">
          Dont Have Account Sign Up
        </Link>
      </div>
      <JSONview formValue={formValue} formError={formError} />
    </>
  );
}

export default SignUpForm;
