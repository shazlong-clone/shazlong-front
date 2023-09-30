import React, { useRef, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { Button, Divider, FlexboxGrid, Form, IconButton, Modal, Panel, Schema, Stack, TagPicker } from 'rsuite';
import { RiAddFill } from 'react-icons/ri';

function Interstes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const interstesList = [
    ' Adolescence disorders ',
    ' Mood disorders (depression) ',
    ' Anxiety disorders and obsessions ',
    ' Marriage Counselling/Relationship Disorders ',
    ' Addiction ',
    ' Sexual disorders ',
  ];
  const formRef = useRef();

  const tagOptionss = interstesList?.map((el) => {
    return { label: el, value: el };
  });
  const [formValue, setFormValue] = useState({});
  const model = Schema.Model({
    interstes: Schema.Types.ArrayType().isRequired('This field is required.'),
  });
  const handleSubmit = () => {
    if (!formRef.current.check()) return;
  };
  return (
    <Panel
      className="bg-white mb-6"
      header={
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <h5 className="capitalize text-gray/80">Intersts</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<RiAddFill />} />

            <Modal backdrop="static" open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title>Edit Intersts</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ overflow: 'visible', paddingBottom: '0px', marginTop: '0px' }}>
                <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
                  <hr className="m-2 mx-0" />
                  <Form.Group controlId="interstes">
                    <Form.HelpText>Interstes</Form.HelpText>
                    <Form.Control data={tagOptionss} block name="interstes" accepter={TagPicker} />
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
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      {Array(3)
        .fill('')
        .map((el) => {
          return (
            <>
              <Button key={Math.random(el)} className="flex gap-4 w-full text-start mb-5 items-start">
                <section>
                  <img
                    className="w-[50px] h-[50px] object-cover"
                    src="https://media.licdn.com/dms/image/C4E0BAQFNW7qmTZtuBg/company-logo_200_200/0/1622535529266?e=1704326400&v=beta&t=LDOHH8DlgtNLJO8RpHt_gs-49f92eb5aQMGLCM6ZHso"
                  />
                </section>
                <section className="grow">
                  <h6 className="mb-2 flex justify-between ">
                    <span>this is Title</span>
                    <MdOutlineEdit />
                  </h6>
                  <p className="text-sm">this is Job description to know </p>
                  <a className="text-sm">Oct 2005 - Sep 2007</a>
                </section>
              </Button>
            </>
          );
        })}
    </Panel>
  );
}

export default Interstes;
