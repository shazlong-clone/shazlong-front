import React, { useEffect, useRef, useState } from 'react';
import Card from '../components/Shared/Card';
import therapist from '../assets/images/therapist.webp';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCamera } from 'react-icons/ai';
import clsx from 'clsx';
import {
  Button,
  ButtonToolbar,
  Schema,
  DatePicker,
  Form,
  InputGroup,
  InputPicker,
  Radio,
  RadioGroup,
  useToaster,
  Message,
} from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../features/auth/authSlice';
import { FaLock } from 'react-icons/fa';

const { Group, HelpText, Control } = Form;

function UserInfo() {
  const formRef = useRef();
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
  const [countries, setCountries] = useState([]);

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

  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('+20');
  const navigate = useNavigate();

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired(t('required')),
    email: Schema.Types.StringType().isRequired().isEmail('not_vaid_email', true),
    password: Schema.Types.StringType().isRequired(t('required')),
    passwordConfirm: Schema.Types.StringType().isRequired(t('required')),
    countryId: Schema.Types.NumberType().isRequired(t('required')),
    phone: Schema.Types.StringType().isRequired(t('required')),
    gender: Schema.Types.StringType().isRequired(t('required')),
    birthDate: Schema.Types.DateType().isRequired(t('required')),
  });
  const toaster = useToaster();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state?.auth);
  const [activeTabe, setActiveTabe] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/countries.json').then((res) => {
      res.json().then((resJosn) => {
        setCountries(resJosn);
      });
    });
  }, []);

  const handleSubmit = async () => {
    if (!formRef.current.check()) return;
    if (formValue?.password !== formValue.passwordConfirm) {
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
        phone: `${countryCode}${formValue?.phone}`,
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

  return (
    <main className="bg-cyan/10 py-5">
      <div className="container">
        <section>
          <Card className="rounded-none text-center">
            <div className="relative inline-block p-2">
              <img className="rounded-full w-[100px] h-[100px] border-2 border-solid border-cyan" src={therapist} />
              <i className="absolute end-0 bottom-0 bg-white rounded-full p-2 translate-x-[-30%]">
                <AiFillCamera className="flex items-center" />
              </i>
            </div>
            <p className="mt-5 text-cyan capitalize">{user.name}</p>
          </Card>
          <Card className="rounded-none mt-5 p-0">
            <article className="flex">
              <div
                onClick={() => setActiveTabe(1)}
                className={clsx(
                  'grow px-5 py-4 capitalize border-solid border-t-0 border-r-0 border-l-0 font-semibold',
                  activeTabe === 1 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                )}
              >
                personal info
              </div>
              <div
                onClick={() => setActiveTabe(2)}
                className={clsx(
                  'grow px-5 py-4 capitalize  border-solid border-t-0 border-r-0 border-l-0 font-semibold',
                  activeTabe === 2 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                )}
              >
                payment info
              </div>
            </article>
            <article className="p-5">
              <Form ref={formRef} formValue={formValue} onChange={setFormValues} model={model} fluid className="mt-5 sign-form">
                <Group controlId="name">
                  <Form.ControlLabel>Name *</Form.ControlLabel>
                  <Control size="lg" placeholder="User Name" name="name" block="true" />
                  <HelpText>You can use letters a-z, numbers and periods (- , _ , .)</HelpText>
                </Group>
                <Group controlId="email">
                  <Form.ControlLabel>Email *</Form.ControlLabel>
                  <Control size="lg" block="true" placeholder="Email" name="email" />
                </Group>
                <Group controlId="countryId">
                  <Form.ControlLabel>Country *</Form.ControlLabel>
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
                  <Form.ControlLabel>Birthe Date *</Form.ControlLabel>
                  <Control accepter={DatePicker} style={{ width: '100%' }} name="birthDate" block />
                </Group>
                <Group controlId="phone">
                  <Form.ControlLabel>Phone *</Form.ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon>{countryCode}</InputGroup.Addon>
                    <Control name="phone" placeholder="Phone Number" size="lg" />
                  </InputGroup>
                </Group>
                <Group controlId="gender">
                  <Form.ControlLabel>Gender *</Form.ControlLabel>
                  <Control accepter={RadioGroup} name="gender" inline>
                    <Radio value="1">Male</Radio>
                    <Radio value="2">Female</Radio>
                  </Control>
                </Group>
                <Group controlId="submit">
                  <ButtonToolbar>
                    <Button
                      disabled={loading}
                      onClick={handleSubmit}
                      appearance="primary"
                      type="submit"
                      block
                      loading={loading}
                      startIcon={<FaLock />}
                    >
                      <strong className="pb-[1px] mx-[2px]">Update</strong>
                    </Button>
                  </ButtonToolbar>
                </Group>
              </Form>
            </article>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default UserInfo;
