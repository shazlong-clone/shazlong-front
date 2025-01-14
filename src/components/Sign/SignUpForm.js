import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  DatePicker,
  Form,
  InputGroup,
  InputPicker,
  Message,
  Radio,
  RadioGroup,
  Schema,
  useToaster,
} from 'rsuite';

import AOS from 'aos';
import 'aos/dist/aos.css';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { signUp } from '../../features/auth/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { genders } from '../../assets/constants';
import { getCountries } from '../../features/shared/sharedActions';

const { Group, HelpText, Control } = Form;
function SignUpForm() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const toaster = useToaster();
  const dispatch = useDispatch();
  const [acceptLicence, setAcceptLicence] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('+20');
  const { countries } = useSelector((state) => state?.shared);
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
    name: Schema.Types.StringType().isRequired(t('required')),
    email: Schema.Types.StringType().isRequired(t('required')).isEmail(t('not_valid_email'), true),
    password: Schema.Types.StringType().isRequired(t('required')),
    passwordConfirm: Schema.Types.StringType().isRequired(t('required')),
    countryId: Schema.Types.NumberType().isRequired(t('required')),
    phone: Schema.Types.StringType().isRequired(t('required')),
    gender: Schema.Types.NumberType().isRequired(t('required')),
    birthDate: Schema.Types.DateType().isRequired(t('required')),
  });

  const [formValue, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    countryId: 2500,
    phone: '',
    gender: '',
    birthDate: new Date(),
    role: 1,
  });
  const formRef = useRef();

  const handleSubmit = async () => {
    if (!formRef.current.check()) return;
    if (formValue?.password?.trim() !== formValue.passwordConfirm?.trim()) {
      return toaster.push(
        <Message closable showIcon type="error">
          {t('password_passwordconfirm_ne')}
        </Message>,
        {
          duration: 5000,
        },
      );
    }
    try {
      setLoading(true);
      const params = {
        ...formValue,
        countryCode: countryCode,
      };
      const res = await dispatch(signUp(params));
      if (res?.payload?.status) {
        localStorage.setItem('token', res.payload.token);
        toaster.push(
          <Message closable showIcon type="success">
            {t('signed_up_success')}
          </Message>,
          {
            duration: 5000,
          },
        );
        navigate('/');
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getCountries());
    AOS.init();
  }, []);

  return (
    <>
      <Form ref={formRef} formValue={formValue} onChange={setFormValues} model={model} fluid className="sign-form">
        <Group style={{marginBottom: '0px'}} controlId="name">
          <Control size="lg" placeholder={t('Name')} name="name" block="true" />
          <HelpText>{t('Name_Helper_Text')}</HelpText>
        </Group>
        <Group controlId="email">
          <Control size="lg" block="true" placeholder={t('Email')} name="email" />
        </Group>
        <Group controlId="password">
          <InputGroup>
            <Control size="lg" name="password" placeholder={t('Password')} type={visible ? 'text' : 'password'} />
            <InputGroup.Button onClick={() => setVisible(!visible)}>{visible ? <EyeIcon /> : <EyeSlashIcon />}</InputGroup.Button>
          </InputGroup>
        </Group>
        <Group controlId="passwordConfirm">
          <InputGroup accepter={InputGroup}>
            <Control
              placeholder={t('Password_Confirm')}
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
            placeholder={t('Country')}
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
          <Control placeholder={t('Birth_Date')} accepter={DatePicker} style={{ width: '100%' }} name="birthDate" block />
        </Group>
        <Group controlId="phone">
          <InputGroup>
            <InputGroup.Addon>{countryCode}</InputGroup.Addon>
            <Control name="phone" placeholder={t('Phone')} size="lg" />
          </InputGroup>
        </Group>
        <Group controlId="gender">
          <Control accepter={RadioGroup} name="gender" inline>
            {genders?.map((el) => {
              return (
                <Radio key={el?.id} value={el?.id}>
                  {t(el?.name)}
                </Radio>
              );
            })}
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
            {t('I_Agree_With_The')}
            <Link to={`/${i18n.resolvedLanguage}/licence`} className="underline">
              {t('Privacy_Policy')}
            </Link>
          </Control>
        </Group>
        <Group controlId="submit">
          <ButtonToolbar>
            <Button
              disabled={!acceptLicence || loading}
              onClick={handleSubmit}
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
          <Link to={`/${i18n.resolvedLanguage}/sign-in`} className="underline">
            {t('Sign_In')}
          </Link>
        </div>
      </Form>
      {
        // eslint-disable-next-line no-undef
        // process.env.NODE_ENV === 'development' ? <JSONView formValue={formValue} formError={formError} /> : ''
      }
    </>
  );
}

export default SignUpForm;
