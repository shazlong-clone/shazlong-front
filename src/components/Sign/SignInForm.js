import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonToolbar, Checkbox, Form, InputGroup, Message, Schema, useToaster } from 'rsuite';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInDoctor, signInUser } from '../../features/auth/authAction';
import { useTranslation } from 'react-i18next';
const { Group, HelpText, Control } = Form;
function SignUpForm({ isSignAsUse }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [acceptLiecence, setAcceptLicence] = useState(false);
  const navigate = useNavigate();
  const model = Schema.Model({
    email: Schema.Types.StringType().isRequired(t('required')).isEmail(t('not_valid_email'), true),
    password: Schema.Types.StringType().isRequired(t('required')),
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
      let res;
      if (isSignAsUse) {
        res = await dispatch(signInUser(formValue));
      } else {
        res = await dispatch(signInDoctor(formValue));
      }
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('sign_in_successfuly')}
          </Message>,
          { duration: 2000 },
        );
        if (isSignAsUse) {
          localStorage.setItem('token', res.payload.token);
          navigate('/');
        } else {
          localStorage.setItem('doctorToken', res.payload.token);
          navigate('/doctor');
        }
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

  useEffect(() => {
    AOS.init();
  }, []);
  const formRef = useRef();
  return (
    <>
      <Form ref={formRef} formValue={formValue} onChange={setFormValues} model={model} fluid className="mt-5 sign-form">
        <Group controlId="email">
          <Control size="lg" block="true" placeholder={t('Email')} name="email" />
        </Group>
        <Group controlId="password" className="mb-0">
          <InputGroup>
            <Control size="lg" name="password" placeholder={t('Password')} type={visible ? 'text' : 'password'} />
            <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
          </InputGroup>
          <HelpText>
            <Link to="/forgot-password">{t('forgot_password')}</Link>
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
              <strong className="pb-[1px] mx-[2px]">{t('Sign_In')}</strong>
            </Button>
          </ButtonToolbar>
        </Group>
      </Form>
      <Checkbox
        onChange={(val, checked) => {
          setAcceptLicence(checked);
        }}
      >
        {t('I_Agree_With_The')}{' '}
        <Link className="underline" to="/licence">
          {t('Privacy_Policy')}
        </Link>{' '}
      </Checkbox>
      <div className="text-center mt-5">
        {t('Dont_Have_Account_Sign_Up')}
        <Link to="/sign-up" className="underline">
          {t('Here')}
        </Link>
      </div>
    </>
  );
}

export default SignUpForm;
