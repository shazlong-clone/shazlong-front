import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonToolbar, Checkbox, Form, InputGroup, Message, Schema, useToaster } from 'rsuite';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { signUpDoctor } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';

const { Group, HelpText, Control } = Form;
function DocSignUpForm() {
  const { t } = useTranslation();
  const [acceptLicence, setAcceptLicence] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConConfirm] = useState(false);

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired('This field is required.'),
    email: Schema.Types.StringType().isRequired('This field is required.').isEmail('Please enter a valid email address.'),
    password: Schema.Types.StringType().isRequired('This field is required'),
    passwordConfirm: Schema.Types.StringType()
      .isRequired('This field is required')
      .addRule((value, data) => {
        return value === data?.password;
      }, 'password and password Confirm Not Equal'),
  });
  const formRef = useRef();

  const [formValue, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [loading, setLoading] = useState();
  const toaster = useToaster();
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!formRef.current.check()) return;
    try {
      setLoading(true);
      const res = await dispatch(signUpDoctor(formValue));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('sign_up_successfuly')}
          </Message>,
          { duration: 2000 },
        );
        localStorage.setItem('doctorVerificationCode', res.payload.code);
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
  return (
    <>
      <Form ref={formRef} formValue={formValue} onChange={setFormValues} model={model} fluid className="mt-5 sign-form">
        <Group controlId="name">
          <Control size="lg" placeholder="User Name *" name="name" block="true" />
          <HelpText>You can use letters a-z, numbers and periods (- , _ , .)</HelpText>
        </Group>
        <Group controlId="email">
          <Control size="lg" block="true" placeholder="Email *" name="email" />
        </Group>
        <Group controlId="password">
          <InputGroup>
            <Control size="lg" name="password" placeholder="Password *" type={visible ? 'text' : 'password'} />
            <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
          </InputGroup>
        </Group>
        <Group controlId="passwordConfirm">
          <InputGroup accepter={InputGroup}>
            <Control
              placeholder="Password Confirm *"
              size="lg"
              name="passwordConfirm"
              type={visibleConfirm ? 'text' : 'password'}
            />
            <InputGroup.Button onClick={() => setVisibleConConfirm(!visibleConfirm)}>
              {visibleConfirm ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
        </Group>

        <Group controlId="acceptLicence" className="ml-[-10px]">
          <Control
            onChange={(val, checked) => {
              setAcceptLicence(checked);
            }}
            accepter={Checkbox}
            name="acceptLicence"
          >
            {t('I_Agree_With_The')}
            <Link to="/licence" className="underline">
              {t('Privacy_Policy')}
            </Link>
          </Control>
        </Group>
        <Group controlId="submit">
          <ButtonToolbar>
            <Button
              disabled={!acceptLicence || loading}
              onClick={onSubmit}
              appearance="primary"
              type="submit"
              block
              loading={loading}
              startIcon={<FaLock />}
            >
              <strong className="pb-[1px] mx-[2px]">{t('Sign_Up')}</strong>
            </Button>
          </ButtonToolbar>
        </Group>
        <div className="text-center mt-[-10px]">
          <Link to="/sign-in" className="underline">
            {t('Sign_In')}
          </Link>
        </div>
      </Form>
    </>
  );
}

export default DocSignUpForm;
