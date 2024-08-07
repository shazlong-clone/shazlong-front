import React, { useEffect, useMemo, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { sunEditorArOptions, sunEditorEnOptions } from '../../../assets/constants';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Button, Col, Form, Grid, Input, InputGroup, InputNumber, Loader, Panel, Row, SelectPicker } from 'rsuite';
import { Schema } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialization } from '../../../features/shared/sharedActions';
import { Link, useNavigate } from 'react-router-dom';
import useSubmition from '../../../hooks/useSubmit';
import { addAricle, getBlog } from '../../../features/blog/blogAction';
import empty from '../../../assets/images/empty.jpg';

function WriteBlog({ id }) {
  const [value, setValue] = useState('');
  const { i18n, t } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const sunEditorOptions = useMemo(() => {
    return locale === 'ar' ? sunEditorArOptions : sunEditorEnOptions;
  }, [locale]);
  const [bodyError, setBodyError] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [formValue, setFormValue] = useState({});

  const { profile } = useSelector((state) => state?.doctor);

  const formRef = useRef();
  const model = Schema.Model({
    title: Schema.Types.StringType().isRequired(t('required')),
    category: Schema.Types.NumberType().isRequired(t('required')),
    durationOfReading: Schema.Types.StringType().isRequired(t('required')),
  });
  const navigate = useNavigate();
  const submit = useSubmition();
  const handleSubmit = async () => {
    if (!value?.replace(/<div><br><\/div>/g, '')?.trim()) {
      setBodyError(t('Body_Required'));
    }
    if (!formValue?.cover) {
      setImgError(t('Cover_Required'));
    }
    if (!formRef.current.check()) {
      return;
    }

    const params = {
      ...formValue,
      id: id,
      body: value,
    };

    const formData = new FormData();
    for (const key in params) {
      if (params[key]) {
        formData.append(key, params[key]);
      }
    }

    setSubmitLoading(true);
    const res = await submit(addAricle, formData, { showLoader: true, showToast: true });
    setSubmitLoading(false);
    if (res?.payload?.status) {
      setFormValue({});
      setValue('');
      navigate('/' + locale + '/doctor/my-blogs');
    }
  };
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { specializationList } = useSelector((state) => state?.shared);
  useEffect(() => {
    dispatch(getSpecialization());
    if (id) {
      setLoading(true);
      dispatch(getBlog(id))
        .then((res) => {
          setFormValue({
            durationOfReading: res?.payload?.result?.durationOfReading,
            title: res?.payload?.result?.title,
            category: res?.payload?.result?.category,
            cover: res?.payload?.result?.cover,
          });
          setValue(res?.payload?.result?.body);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to={`/${locale}/doctor`}>
          {locale === 'ar' ? profile?.fullArName : profile?.fullEnName}{' '}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{t('Blog')}</Breadcrumb.Item>
      </Breadcrumb>
      <Panel className="bg-[var(--rs-bg-card)] overflow-hidden write-blog">
        <Form className="mb-5" ref={formRef} onChange={setFormValue} formValue={formValue} fluid model={model}>
          <Grid fluid>
            <Row>
              <Col xs={24}>
                <Form.Group controlId="title">
                  <Form.ControlLabel>{t('Cover')}</Form.ControlLabel>
                  <Form.Control className='ltr' placeholder={t('Cover')} name="cover" accepter={Input} block />
                </Form.Group>
                <img
                  src={formValue?.cover ?? empty}
                  onError={() => {
                    setFormValue({ ...formValue, cover: 'https://www.casele.ro/images/empty.jpg' });
                  }}
                  alt="cover"
                  className="w-full rounded-xl mb-5 h-[240px] object-cover"
                />
                <Form.ErrorMessage show={Boolean(imgError)}>{imgError}</Form.ErrorMessage>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Group controlId="title">
                  <Form.ControlLabel>{t('Title')}</Form.ControlLabel>
                  <Form.Control placeholder={t('Title')} name="title" accepter={Input} block />
                </Form.Group>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Group controlId="category">
                  <Form.ControlLabel>{t('Category')}</Form.ControlLabel>
                  <Form.Control
                    block
                    placeholder={t('Category')}
                    name="category"
                    searchable={false}
                    accepter={SelectPicker}
                    data={specializationList?.map((el) => {
                      return {
                        label: locale === 'ar' ? el?.ar_name : el?.name,
                        value: el?.id,
                      };
                    })}
                  />
                </Form.Group>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Group controlId="durationOfReading">
                  <Form.ControlLabel>{t('DurationOfReading')}</Form.ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon>{t('Minutes')}</InputGroup.Addon>
                    <Form.Control placeholder={t('DurationOfReading')} block name="durationOfReading" accepter={InputNumber} />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Grid>
        </Form>
        <Form.ControlLabel>{t('Articel_Content')}</Form.ControlLabel>
        <SunEditor
          setContents={value}
          onChange={(v) => {
            setValue(v);
            setBodyError(false);
          }}
          setOptions={sunEditorOptions}
        />
        <Form.ErrorMessage show={Boolean(bodyError)}>{bodyError}</Form.ErrorMessage>
        <Button className="my-12" appearance="primary" type="submit" onClick={handleSubmit} disabled={submitLoading}>
          {t('Save')}
        </Button>
      </Panel>
      {loading ? <Loader className="z-[1000000000] fixed" backdrop content={t('Loading')} vertical /> : ''}
    </>
  );
}
export default WriteBlog;
