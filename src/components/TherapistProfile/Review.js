import React, { useRef, useState } from 'react';
import { Button, Form, Input, Message, Modal, Radio, RadioGroup, Rate, Schema, useToaster } from 'rsuite';
import useMediaQuery from '../../hooks/useMediaQuery';
import FormGroup from 'rsuite/esm/FormGroup';
import FormControl from 'rsuite/esm/FormControl';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { genders } from '../../assets/constants';
import i18next from 'i18next';
import { createReview, getDoctorProfile } from '../../features/shared/sharedActions';
import { useParams } from 'react-router-dom';

function Review() {
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const lg = useMediaQuery('lg');
  const Textarea = React.forwardRef((props, ref) => <Input block={true} {...props} as="textarea" ref={ref} />);
  const formRef = useRef();
  const { t } = useTranslation();
  const { doctorProfile } = useSelector((state) => state?.shared);
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();
  const dispatch = useDispatch();
  const formValue = useRef();

  const handelConfirm = async () => {
    if (!formRef.current.check()) return;
    try {
      setLoading(true);
      const res = await dispatch(createReview({ ...formValue.current, doctor: id }));
      if (res?.payload?.status) {
        dispatch(getDoctorProfile(id));
        toaster.push(
          <Message type="success" closable showIcon>
            {t('Review_Added')}
          </Message>,
          { duration: 5000 },
        );
        handleClose();
      } else {
        toaster.push(
          <Message type="error" closable showIcon>
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

  const model = Schema.Model({
    message: Schema.Types.StringType().isRequired(t('required')),
    rate: Schema.Types.NumberType().isRequired(t('required')),
  });
  return (
    <>
      <span className="flex justify-center">
        <Button onClick={handleOpen} size={lg ? 'lg' : 'md'} appearance="ghost">
          {t('Write_Review')}
        </Button>
      </span>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-3xl text-center">{t('Write_Review')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="lg:px-10 py-5 px-4">
          <h6 className="text-lg text-center">
            {t('Your_opinion_matters_tell_us_about_your_experience_with', {
              doctor: t(`${doctorProfile?.gender === genders[1]?.id ? 'Femal_Doctor' : 'Male_Doctor'}`),
            })}
          </h6>
          <p className="text-xl text-center text-cyan mb-5 font-bold">
            {i18next.resolvedLanguage === 'ar' ? doctorProfile?.fullArName : doctorProfile?.fullEnName}
          </p>
          <Form
            model={model}
            fluid
            ref={formRef}
            onChange={(values) => {
              formValue.current = values;
            }}
          >
            <FormGroup>
              <Form.ControlLabel className="text-base">1.{t('How_would_you_rate_your_experience')}</Form.ControlLabel>
              <FormControl name="rate" className="mt-2" size="sm" accepter={Rate} />
            </FormGroup>
            <FormGroup>
              <Form.ControlLabel className="text-base">2.{t('Write_something_about_your_experience')}</Form.ControlLabel>
              <FormControl className="mt-2" placeholder={t('Write_Here')} rows={5} name="message" accepter={Textarea} />
            </FormGroup>
            <FormGroup>
              <Form.ControlLabel className="text-base">
                3.
                {t('Would_you_recommend_this_therapist_to_others', {
                  name: i18next.resolvedLanguage == 'ar' ? doctorProfile?.fullArName : doctorProfile?.fullEnName,
                })}
              </Form.ControlLabel>
              <FormControl className="mt-2" name="recommend" accepter={RadioGroup}>
                <Radio value="Yes">{t('Yes')}</Radio>
                <Radio value="no">{t('No')}</Radio>
              </FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button loading={loading} onClick={handelConfirm} appearance="primary">
            {t('Confirm')}
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            {t('Cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Review;
