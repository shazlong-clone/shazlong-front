import React, { useRef } from 'react';
import { Button, Form, Input, Modal, Radio, RadioGroup, Rate } from 'rsuite';
import useMediaQuery from '../../utils/useMediaQuery';
import FormGroup from 'rsuite/esm/FormGroup';
import FormControl from 'rsuite/esm/FormControl';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { genders } from '../../assets/constants';
import i18next from 'i18next';

function Review() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const lg = useMediaQuery('lg');
  const Textarea = React.forwardRef((props, ref) => <Input block={true} {...props} as="textarea" ref={ref} />);
  let ref = useRef();
  const { t } = useTranslation();
  const { doctorProfile } = useSelector((state) => state?.shared);

  return (
    <>
      <span className="flex justify-end">
        <Button onClick={handleOpen} size={lg ? 'lg' : 'md'} appearance="primary">
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
            fluid
            onChange={(values) => {
              ref.current = values;
            }}
          >
            <FormGroup>
              <Form.ControlLabel className="text-base">1.{t('How_would_you_rate_your_experience')}</Form.ControlLabel>
              <FormControl name="rate" className="mt-2" size="sm" accepter={Rate} />
            </FormGroup>
            <FormGroup>
              <Form.ControlLabel className="text-base">2.{t('Write_something_about_your_experience')}</Form.ControlLabel>
              <FormControl className="mt-2" placeholder="write you review here" rows={5} name="textarea" accepter={Textarea} />
            </FormGroup>
            <FormGroup>
              <Form.ControlLabel className="text-base">
                3.{' '}
                {t('Would_you_recommend_this_therapist_to_others', {
                  name: i18next.resolvedLanguage == 'ar' ? doctorProfile?.fullArName : doctorProfile?.fullEnName,
                })}
              </Form.ControlLabel>
              <FormControl className="mt-2" name="RadioGroup" accepter={RadioGroup}>
                <Radio value="Yes">{t('Yes')}</Radio>
                <Radio value="no">{t('No')}</Radio>
              </FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
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
