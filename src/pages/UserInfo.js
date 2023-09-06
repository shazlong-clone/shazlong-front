import React, { useEffect, useRef, useState } from 'react';
import Card from '../components/Shared/Card';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Button,
  ButtonToolbar,
  DatePicker,
  Form,
  InputGroup,
  InputPicker,
  Radio,
  RadioGroup,
  useToaster,
  Message,
  Uploader,
  Loader,
  Grid,
  Col,
  Row,
  FlexboxGrid,
} from 'rsuite';
import { genders } from '../assets/constants';
import { useTranslation } from 'react-i18next';
import { updateMe } from '../features/auth/authSlice';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { API_BASE_URL } from '../config/enviroment.config';
import { LuEdit } from 'react-icons/lu';

const { Group, HelpText, Control } = Form;

function UserInfo() {
  const [plainText, setPlainText] = useState(true);
  const formRef = useRef();
  const { user = {} } = useSelector((state) => state?.auth);
  const initalFormValues = {
    name: user?.name || '',
    email: user?.email || '',
    countryId: user?.countryId || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    birthDate: new Date(user?.birthDate).getTime(),
    countryCode: user?.countryCode,
  };
  const [formValue, setFormValues] = useState(initalFormValues);
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

  function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const { token } = useSelector((state) => state?.auth);
  const [uploading, setUploading] = React.useState(false);

  const [fileInfo, setFileInfo] = React.useState(user?.photo ?? null);
  const props = {
    name: 'photo',
    fileListVisible: false,
    listType: 'picture',
    action: `${API_BASE_URL}/api/v1/users/uploadPhoto`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    onUpload: (file) => {
      setUploading(true);
      previewFile(file.blobFile, (value) => {
        setFileInfo(value);
      });
    },
    onSuccess: () => {
      setUploading(false);
      toaster.push(<Message type="success">Uploaded successfully</Message>);
    },
    onError: () => {
      setFileInfo(null);
      setUploading(false);
      toaster.push(<Message type="error">Upload failed</Message>);
    },
  };
  return (
    <main className="bg-cyan/10 py-5">
      <div className="container">
        <Grid className="lg:my-10">
          <Row gutter={24}>
            <Col xs={24} lg={8}>
              <Card className="rounded-none text-center">
                <div className="relative inline-block p-2">
                  <Uploader {...props}>
                    <button style={{ width: 100, height: 100, borderRadius: '50%' }}>
                      {uploading && <Loader backdrop center />}
                      {fileInfo ? <img src={fileInfo} width="100%" height="100%" /> : <CameraRetroIcon />}
                    </button>
                  </Uploader>
                </div>
                <p className="mt-5 text-cyan capitalize">
                  {user.name}
                  <br />
                  <span className="text-gray">{user.role === 1 ? `(${t('User')})` : `(${t('Doctor')})`}</span>
                </p>
              </Card>
            </Col>
            <Col xs={24} lg={16}>
              <Card className="rounded-none mt-5 p-0 pb-5 lg:mt-0 lg:w-[600px]">
                <article className="flex">
                  <div
                    onClick={() => setActiveTabe(1)}
                    className={clsx(
                      'grow px-5 py-4 capitalize border-solid border-t-0 border-r-0 border-l-0 font-semibold cursor-pointer',
                      activeTabe === 1 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                    )}
                  >
                    {t('Personal_Info')}
                  </div>
                  <div
                    onClick={() => setActiveTabe(2)}
                    className={clsx(
                      'grow px-5 py-4 capitalize  border-solid border-t-0 border-r-0 border-l-0 font-semibold cursor-pointer',
                      activeTabe === 2 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                    )}
                  >
                    {t('Payment_Info')}
                  </div>
                </article>
                <article className="p-5 relative">
                  {plainText ? (
                    <a className="cursor-pointer absolute end-0 top-0 mt-5 mx-3" onClick={() => setPlainText(false)}>
                      {t('Edit')} <LuEdit />
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
                    className="sign-form"
                  >
                    <Group controlId="name">
                      <Form.ControlLabel>{t('Name')}</Form.ControlLabel>
                      <Control size="lg" placeholder={t('Name')} name="name" block="true" />
                      {!plainText ? <HelpText>{t('Name_Helper_Text')}</HelpText> : ''}
                    </Group>
                    <Group controlId="email">
                      <Form.ControlLabel>{t('Email')}</Form.ControlLabel>
                      <Control size="lg" block="true" placeholder={t('Email')} name="email" />
                    </Group>
                    <Group controlId="countryId">
                      <Form.ControlLabel>{t('Country')}</Form.ControlLabel>
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
                      <Form.ControlLabel>{t('Birth_Date')}</Form.ControlLabel>
                      <Control
                        placeholder={t('Birth_Date')}
                        accepter={DatePicker}
                        style={{ width: '100%' }}
                        name="birthDate"
                        block
                      />
                    </Group>
                    <Group controlId="phone">
                      <Form.ControlLabel>{t('Phone')}</Form.ControlLabel>

                      {plainText ? (
                        <Control name="phone" placeholder={t('Phone')} size="lg" />
                      ) : (
                        <InputGroup>
                          <InputGroup.Addon>{countryCode}</InputGroup.Addon>
                          <Control name="phone" placeholder={t('Phone')} size="lg" />
                        </InputGroup>
                      )}
                    </Group>
                    <Group controlId="gender">
                      <Form.ControlLabel>{t('Gender')}</Form.ControlLabel>
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

                    {plainText ? (
                      ''
                    ) : (
                      <FlexboxGrid justify="center">
                        <FlexboxGrid.Item>
                          <Group controlId="submit">
                            <ButtonToolbar>
                              <Button
                                disabled={loading}
                                onClick={handleSubmit}
                                appearance="primary"
                                type="submit"
                                loading={loading}
                              >
                                <strong className="pb-[1px] mx-[2px]">{t('Update')}</strong>
                              </Button>
                              <Button
                                onClick={() => {
                                  setPlainText(true);
                                  setFormValues(initalFormValues);
                                }}
                              >
                                {t('Cancel')}
                              </Button>
                            </ButtonToolbar>
                          </Group>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    )}
                  </Form>
                </article>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    </main>
  );
}

export default UserInfo;
