import React, { useEffect, useRef, useState } from 'react';
import Card from '../components/Shared/Card';
import therapist from '../assets/images/therapist.webp';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCamera } from 'react-icons/ai';
import clsx from 'clsx';
import { Button, ButtonToolbar, DatePicker, Form, InputGroup, InputPicker, Radio, RadioGroup, useToaster, Message } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { updateMe } from '../features/auth/authSlice';

const { Group, HelpText, Control } = Form;

function UserInfo() {
  const [plainText, setPlainText] = useState(false);
  const formRef = useRef();
  const { user = {} } = useSelector((state) => state?.auth);
  const [formValue, setFormValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    countryId: user?.countryId || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    birthDate: new Date(user?.birthDate).getTime(),
    countryCode: user?.countryCode,
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
  const [countryCode, setCountryCode] = useState(user?.countryCode || '');
  const toaster = useToaster();
  const [loading, setLoading] = useState(false);

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
        countryCode,
      };
      const res = await dispatch(updateMe(params));
      if (res?.payload?.status) {
        toaster.push(
          <Message closable showIcon type="success">
            {t('update_successfuly')}
          </Message>,
          {
            duration: 5000,
          },
        );
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
        <section className="lg:grid lg:grid-cols-[1fr_4fr] gap-5 items-start lg:mt-10">
          <Card className="rounded-none text-center">
            <div className="relative inline-block p-2">
              <img className="rounded-full w-[100px] h-[100px] border-2 border-solid border-cyan" src={therapist} />
              <i className="absolute end-0 bottom-0 bg-white rounded-full p-2 translate-x-[-30%]">
                <AiFillCamera className="flex items-center" />
              </i>
            </div>
            <p className="mt-5 text-cyan capitalize">
              {user.name}
              <br />
              <span className="text-gray">{user.role === 1 ? '(user)' : '(doctor)'}</span>
            </p>
          </Card>
          <Card className="rounded-none mt-5 p-0 pb-16 lg:mt-0">
            <article className="flex">
              <div
                onClick={() => setActiveTabe(1)}
                className={clsx(
                  'grow px-5 py-4 capitalize border-solid border-t-0 border-r-0 border-l-0 font-semibold cursor-pointer',
                  activeTabe === 1 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                )}
              >
                personal info
              </div>
              <div
                onClick={() => setActiveTabe(2)}
                className={clsx(
                  'grow px-5 py-4 capitalize  border-solid border-t-0 border-r-0 border-l-0 font-semibold cursor-pointer',
                  activeTabe === 2 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                )}
              >
                payment info
              </div>
            </article>
            <article className="p-5">
              {plainText ? (
                <a className="cursor-pointer" onClick={() => setPlainText(false)}>
                  Edit Profile
                </a>
              ) : (
                ''
              )}

              <Form
                plaintext={plainText}
                ref={formRef}
                formValue={formValue}
                onChange={setFormValues}
                fluid
                className="mt-5 sign-form"
              >
                <Group controlId="name">
                  <Form.ControlLabel>Name </Form.ControlLabel>
                  <Control size="lg" placeholder="User Name" name="name" block="true" />
                  <HelpText>You can use letters a-z, numbers and periods (- , _ , .)</HelpText>
                </Group>
                <Group controlId="email">
                  <Form.ControlLabel>Email </Form.ControlLabel>
                  <Control size="lg" block="true" placeholder="Email" name="email" />
                </Group>
                <Group controlId="countryId">
                  <Form.ControlLabel>Country </Form.ControlLabel>
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
                  <Form.ControlLabel>Birthe Date </Form.ControlLabel>
                  <Control accepter={DatePicker} style={{ width: '100%' }} name="birthDate" block />
                </Group>
                <Group controlId="phone">
                  <Form.ControlLabel>Phone </Form.ControlLabel>

                  {plainText ? (
                    <Control name="phone" placeholder="Phone Number" size="lg" />
                  ) : (
                    <InputGroup>
                      <InputGroup.Addon>{countryCode}</InputGroup.Addon>
                      <Control name="phone" placeholder="Phone Number" size="lg" />
                    </InputGroup>
                  )}
                </Group>
                <Group controlId="gender">
                  <Form.ControlLabel>Gender </Form.ControlLabel>
                  <Control accepter={RadioGroup} name="gender" inline>
                    <Radio value="1">Male</Radio>
                    <Radio value="2">Female</Radio>
                  </Control>
                </Group>

                {plainText ? (
                  ''
                ) : (
                  <Group controlId="submit">
                    <ButtonToolbar>
                      <Button disabled={loading} onClick={handleSubmit} appearance="primary" type="submit" loading={loading}>
                        <strong className="pb-[1px] mx-[2px]">Update</strong>
                      </Button>
                      <Button onClick={() => setPlainText(true)}>Cancel</Button>
                    </ButtonToolbar>
                  </Group>
                )}
              </Form>
            </article>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default UserInfo;
