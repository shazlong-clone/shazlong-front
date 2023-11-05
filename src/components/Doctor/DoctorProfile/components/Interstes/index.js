import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlexboxGrid, Form, IconButton, Message, Modal, Panel, Schema, Stack, TagPicker, toaster } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { updateDoctorProfile } from '../../../../../features/doctor/doctorActions';
import { getMeAsDoctor } from '../../../../../features/auth/authAction';
import { getSpecialization } from '../../../../../features/shared/sharedActions';
import Empty from '../../../../Shared/Empty';

function Interstes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formRef = useRef();
  const { t, i18n } = useTranslation();
  const { specializationList } = useSelector((state) => state?.shared);

  const tagOptions = specializationList?.map((el) => {
    return { label: i18n.resolvedLanguage === 'ar' ? el?.ar_name : el?.name, value: el?.id };
  });
  const profile = useSelector((state) => state?.doctor?.profile);
  const [formValue, setFormValue] = useState({ specialization: profile?.specialization ?? [] });
  const model = Schema.Model({
    specialization: Schema.Types.ArrayType().isRequired('This field is required.'),
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (!formRef.current.check()) return;
    try {
      setLoading(true);
      const res = await dispatch(updateDoctorProfile(formValue));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('Updated_Succefuly')}
          </Message>,
          { duration: 2000 },
        );
        dispatch(getMeAsDoctor());
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
  useEffect(() => {
    dispatch(getSpecialization());
  }, []);
  useEffect(()=>{
    setFormValue({specialization: profile?.specialization ?? []})
  },[profile])

  return (
    <Panel
      className="bg-white mb-6"
      header={
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <h5 className="capitalize text-gray/80">Specialization</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<MdOutlineEdit />} />
            <Modal backdrop="static" open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title>Edit Specialization</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ overflow: 'visible', paddingBottom: '0px', marginTop: '0px' }}>
                <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
                  <hr className="m-2 mx-0" />
                  <Form.Group controlId="specialization">
                    <Form.HelpText>specialization</Form.HelpText>
                    <Form.Control data={tagOptions} block name="specialization" accepter={TagPicker} />
                  </Form.Group>
                  <hr className="m-3 mx-0" />
                  <FlexboxGrid justify="end">
                    <Stack spacing={16}>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button loading={loading} appearance="primary" onClick={handleSubmit} type="submit">
                        Save
                      </Button>
                    </Stack>
                  </FlexboxGrid>
                </Form>
              </Modal.Body>
            </Modal>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      {!profile?.specialization?.length ? (
        <Empty />
      ) : (
        <div className="flex gap-2 flex-wrap" key={Math.random()}>
          {specializationList
            ?.filter((el) => profile?.specialization?.includes(el?.id))
            ?.map((el) => {
              return (
                <section key={el?.id} className="rounded-3xl py-1 bg-gray/5 px-2">
                  {i18n.resolvedLanguage === 'ar' ? el?.ar_name : el?.name}
                </section>
              );
            })}
        </div>
      )}
    </Panel>
  );
}

export default Interstes;
