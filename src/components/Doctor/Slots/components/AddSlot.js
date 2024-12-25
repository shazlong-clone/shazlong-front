import moment from 'moment';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Button, DateRangePicker, Form, IconButton, Message, Modal, Schema, useToaster } from 'rsuite';
import { getSlots, createSlots } from '../../../../features/doctor/doctorActions';

const CellAddModal = ({ date, slots }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formRef = useRef();
  const [formValue, setFormValue] = useState();
  const model = Schema.Model({
    from_to: Schema.Types.MixedType()
      .isRequired('required')
      .addRule((value) => {
        return moment(value[1]).isAfter(value[0]);
      }, t('from_must_be_grater_than_to'))
      .addRule(value =>{
       return slots?.length > 0 ? slots?.some(slot =>{
        const momFrom = moment(slot?.from);
        const momTo = moment(slot?.to);
          return (moment(value[0]).isBetween(momFrom, momTo))
          ||
           (moment(value[1]).isBetween(momFrom, momTo))
        }) : true
      }, t('Ovelaped_Slot_Period'))
  });
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();
  const dispatch = useDispatch();

  const handelSubmit = async () => {
    if (!formRef.current.check()) return;
    const from = formValue?.from_to[0];
    const to = formValue?.from_to[1];
    // here is the logic
    const params = {
      slots: [
        {
          from: moment(date)
            .set({ hours: from.getHours(), minutes: from.getMinutes(), seconds: 0, milliseconds: 0 })
            .toISOString(),
          to: moment(date).set({ hours: to.getHours(), minutes: to.getMinutes(), seconds: 0, milliseconds: 0 }).toISOString(),
        },
      ],
    };
    try {
      setLoading(true);
      const res = await dispatch(createSlots(params));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('updated_successfuly')}
          </Message>,
          { duration: 2000 },
        );
        dispatch(getSlots());
        setOpen(false);
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
  return (
    <>
      <IconButton
        onClick={handleOpen}
        className="icon-add-btn absolute start-[5px] top-[5px]"
        style={{ padding: '5px' }}
        icon={<MdAddCircleOutline className="flex items-center" />}
      />
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('Add_Slot')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'inherit' }}>
          <Form model={model} ref={formRef} formValue={formValue} onChange={setFormValue} fluid>
            <Form.Group controlId="slots">
              <Form.Control
                showHeader={false}
                label={t('Session_Start_End_Date')}
                placeholder={t('Slot_Date')}
                name="from_to"
                ranges={[]}
                showMeridian
                block
                editable={false}
                accepter={DateRangePicker}
                format="hh:mm aa"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            {t('Cancel')}
          </Button>
          <Button loading={loading} onClick={handelSubmit} appearance="primary">
            {t('Save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CellAddModal;
