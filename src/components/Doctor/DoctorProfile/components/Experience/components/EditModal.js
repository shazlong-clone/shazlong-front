import React, { useRef, useState } from 'react';
import { Button, DateRangePicker, FlexboxGrid, Form, IconButton, Modal, Schema, Stack, Uploader } from 'rsuite';
import { RiAddFill } from 'react-icons/ri';

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
    console.log(formValue);
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<RiAddFill />} />
      <Modal backdrop="static" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'visible', paddingBottom: '0px', marginTop: '0px' }}>
          <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
            <hr className="m-2 mx-0" />
            <Form.Group controlId="title">
              <Form.HelpText>Title</Form.HelpText>
              <Form.Control placeholder="Enter Title" block name="title" />
            </Form.Group>
            <Form.Group controlId="ar_title">
              <Form.HelpText>Arabic Title</Form.HelpText>
              <Form.Control placeholder="Enter Arabic Title" block name="ar_title" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.HelpText>Description</Form.HelpText>
              <Form.Control placeholder="Enter Description" block name="description" />
            </Form.Group>
            <Form.Group controlId="ar_description">
              <Form.HelpText>Arabic Description</Form.HelpText>
              <Form.Control placeholder="Enter Arabic Description" block name="ar_description" />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.HelpText>Time</Form.HelpText>
              <Form.Control block name="time" accepter={DateRangePicker} />
            </Form.Group>
            <Form.Group controlId="uploader">
              <Form.HelpText>Company Pic</Form.HelpText>
              <Form.Control
                fileList={fileList}
                onChange={(files) => {
                  setFileList([{ name: files?.at(-1)?.blobFile?.name }]);
                }}
                name="company_name"
                autoUpload={false}
                multiple={false}
                accepter={Uploader}
                removable={false}
                accept="image/png, image/jpeg"
              />
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
