import React, { useRef, useState } from 'react';
import { Button, DateRangePicker, FlexboxGrid, Form, IconButton, InputNumber, Modal, Schema, Stack, Uploader } from 'rsuite';
import { MdOutlineEdit } from 'react-icons/md';

function EditModal() {
  const formRef = useRef();
  const handleClose = () => setOpen(false);

  const [formValue, setFormValue] = useState({});
  const model = Schema.Model({
    interstes: Schema.Types.ArrayType().isRequired('This field is required.'),
  });
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<MdOutlineEdit />} />
      <Modal backdrop="static" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'visible', paddingBottom: '0px', marginTop: '0px' }}>
          <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
            <hr className="m-2 mx-0" />
            <Form.Group controlId="Email">
              <Form.HelpText>Email</Form.HelpText>
              <Form.Control placeholder="Enter Email" block name="Email" />
            </Form.Group>
            <Form.Group controlId="Address">
              <Form.HelpText>Address</Form.HelpText>
              <Form.Control placeholder="Enter Address" block name="Address" />
            </Form.Group>
            <Form.Group controlId="Phone">
              <Form.HelpText>Phone</Form.HelpText>
              <Form.Control placeholder="Enter Phone" block name="Phone" />
            </Form.Group>
            <Form.Group controlId="Abbreviation">
              <Form.HelpText>Abbreviation</Form.HelpText>
              <Form.Control placeholder="Enter Abbreviation" block name="Abbreviation" />
            </Form.Group>
            <Form.Group controlId="Feez30">
              <Form.HelpText>Feez Per 30 minutes</Form.HelpText>
              <Form.Control prefix="30 mins" accepter={InputNumber} placeholder="Enter Feez Per 30 minutes" block name="Feez30" />
            </Form.Group>
            <Form.Group controlId="Feez60">
              <Form.HelpText>Feez Per 60 minutes</Form.HelpText>
              <Form.Control prefix="60 mins" accepter={InputNumber} placeholder="Enter Feez Per 60 minutes" block name="Feez60" />
            </Form.Group>
            <hr className="m-3 mx-0" />
            <FlexboxGrid justify="end">
              <Stack spacing={16}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button appearance="primary" onClick={handleSubmit} type="submit">
                  Save
                </Button>
              </Stack>
            </FlexboxGrid>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;
