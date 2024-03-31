import moment from 'moment';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, DateRangePicker, FlexboxGrid, Form, Message, Modal, Schema, useToaster } from 'rsuite';
import { deleteSlot, getSlots, updateSlot } from '../../../../features/doctor/doctorActions';
import { MdArrowRightAlt } from 'react-icons/md';

const UpdateSlot = ({ date, slot }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    from_to: [new Date(slot?.from), new Date(slot.to)],
  });
  const model = Schema.Model({
    from_to: Schema.Types.MixedType()
      .isRequired('Required.')
      .addRule((value) => {
        return moment(value[1]).isAfter(value[0]);
      }, 'from_must_be_grater_yjat_to'),
  });
  const [loading, setLoading] = useState(false);
  const [dLoading, setDLoading] = useState(false);
  const toaster = useToaster();
  const dispatch = useDispatch();

  const handelSubmit = async () => {
    if (!formRef.current.check()) return;
    const from = formValue?.from_to[0];
    const to = formValue?.from_to[1];

    const params = {
      from: moment(date).set({ hours: from.getHours(), minutes: from.getMinutes(), seconds: 0, milliseconds: 0 }).toISOString(),
      to: moment(date).set({ hours: to.getHours(), minutes: to.getMinutes(), seconds: 0, milliseconds: 0 }).toISOString(),
    };
    try {
      setLoading(true);
      const res = await dispatch(updateSlot({ id: slot._id, params }));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('Updated_Succefuly')}
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

  const handelDelete = async () => {
    try {
      setDLoading(true);
      const res = await dispatch(deleteSlot(slot._id));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('Updated_Succefuly')}
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
      setDLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="text-xs font-bold"
        appearance="primary"
        color={moment(slot.from).isSameOrAfter(moment(slot.to)) ? 'red' : slot.reserved ? 'green' : ''}
      >
        <div className="flex items-center justify-between min-w-[140px]">
          {moment(slot.from).format('hh:mm a')}
          <MdArrowRightAlt className="text-xl" />
          {moment(slot.to).format('hh mm a')}
        </div>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('Update_Slot')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'inherit' }}>
          <Form model={model} ref={formRef} formValue={formValue} onChange={setFormValue} fluid>
            <Form.Group controlId="slots">
              <Form.Control
                placeholder={t('Slot_Date')}
                name="from_to"
                ranges={[]}
                showMeridian
                block
                accepter={DateRangePicker}
                format="hh:mm aa"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>
              <Button disabled={slot.reserved} loading={dLoading} onClick={handelDelete} color="red" appearance="primary">
                Delete
              </Button>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
              <Button loading={loading} onClick={handelSubmit} appearance="primary">
                Save
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateSlot;
