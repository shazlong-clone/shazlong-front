import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Grid,
  InputNumber,
  InputPicker,
  Row,
  TagPicker,
  Uploader,
  FlexboxGrid,
  toaster,
  Message,
} from 'rsuite';
import logo from '../assets/images/shezlong-logo.svg';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { genders } from '../assets/constants';
import { API_BASE_URL } from '../config/enviroment.config';
import { useDispatch, useSelector } from 'react-redux';
import { verificate } from '../features/auth/authAction';
const { Control, HelpText, Group } = Form;
function VerifyEmailRegistration() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const formRef = useRef();
  const { doctorVerificationCode } = useSelector((state) => state?.auth);
  const [formValue, setFormValue] = useState({
    fullArName: '',
    fullEnName: '',
    experienceYears: null,
    gender: null,
    country: null,
    languages: [],
    prefix: '',
    birthDate: null,
  });
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!formRef.current?.check()) return;
    try {
      setLoading(true);
      const res = await dispatch(verificate(formValue));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" showIcon={true} closable={true}>
            {t('update_successfuly')}
          </Message>,
          { duration: 5000 },
        );
      } else {
        toaster.push(
          <Message type="error" showIcon={true} closable={true}>
            {res.payload.message}
          </Message>,
          { duration: 5000 },
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
  const [lang, setLang] = useState([]);
  const { i18n } = useTranslation();
  const data = lang.map((item) => ({ label: i18n?.resolvedLanguage === 'ar' ? item.ar_name : item?.name, value: item?.id }));
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

  const genderData = genders?.map((el) => {
    return {
      label: t(el?.name),
      value: el?.id,
    };
  });
  const prefixData = ['Dr', 'PsyD', 'Prof', 'MBPsS', 'Mr', 'Mrs', 'Ms'].map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const props = {
    name: 'cv',
    disabledFileItem: true,
    maxPreviewFileSize: 1,
    fileListVisible: true,
    listType: 'picture-text',
    action: `${API_BASE_URL}/api/v1/doctors/uploadCv`,
    headers: {
      'verification-code': doctorVerificationCode || '',
    },
  };

  useEffect(() => {
    fetch('/api/lang.json').then((res) => {
      res.json().then((resJson) => {
        setLang(resJson);
      });
    });
    fetch('/api/countries.json').then((res) => {
      res.json().then((resJosn) => {
        setCountries(resJosn);
      });
    });
  }, []);

  return (
    <main className="bg-gray/5 min-h-screen">
      <div className="container">
        <div className="text-center pt-5 mb-[60px]">
          <Link to="/">
            <img className="w-full max-w-[300px]" src={logo} alt="" />
          </Link>
          <p className="font-[500] text-[20px] mt-5">
            Registration <span className="text-cyan">Step 2/3</span>
          </p>
          <div className="w-[50px] h-[3px] bg-cyan m-auto mt-5" />
        </div>
        <Form ref={formRef} formValue={formValue} onChange={setFormValue} fluid>
          <Grid>
            <Row gutter={16}>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Full Name In English *</HelpText>
                  <Control size="lg" placeholder="Full Name" name="fullEnName" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Full Name In Arabic *</HelpText>
                  <Control size="lg" placeholder="الاسم" name="fullArName" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Experience year *</HelpText>
                  <Control size="lg" accepter={InputNumber} placeholder="Experience year" name="experienceYears" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Country *</HelpText>
                  <Control
                    size="lg"
                    data={countriesData}
                    block
                    accepter={InputPicker}
                    placeholder="Country"
                    name="country"
                    className="lg:max-w-[308px]"
                    menuClassName="md:max-w-[1px]"
                  />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group controlId="gender">
                  <HelpText>Gender *</HelpText>
                  <Control className="lg:max-w-[308px]" size="lg" data={genderData} accepter={InputPicker} name="gender" block />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Language *</HelpText>
                  <Control
                    block
                    size="lg"
                    data={data}
                    className="lg:max-w-[308px]"
                    menuClassName="max-w-[1]"
                    accepter={TagPicker}
                    placeholder="language"
                    name="languages"
                  />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Prefix *</HelpText>
                  <Control
                    size="lg"
                    data={prefixData}
                    accepter={InputPicker}
                    placeholder="prefix"
                    name="prefix"
                    block
                    className="lg:max-w-[308px]"
                    menuStyle={{ maxHeight: '200px' }}
                  />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Birth Date *</HelpText>
                  <Control size="lg" className="w-full" accepter={DatePicker} placeholder="Birth Date" name="birthDate" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <HelpText> </HelpText>
                <Uploader {...props}>
                  <Button className="py-20" block appearance="ghost" size="lg">
                    CV
                  </Button>
                </Uploader>
              </Col>
            </Row>
          </Grid>
          <FlexboxGrid justify="center">
            <Col className="mb-5">
              <HelpText> </HelpText>
              <Button loading={loading} disabled={loading} size="lg" onClick={onSubmit} type="submit" appearance="primary">
                Submit
              </Button>
            </Col>
          </FlexboxGrid>
        </Form>
      </div>
    </main>
  );
}

export default VerifyEmailRegistration;
