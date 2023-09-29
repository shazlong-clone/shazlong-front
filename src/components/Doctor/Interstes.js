import React, { useRef, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { Button, ButtonToolbar, FlexboxGrid, Form, Modal, Panel, Schema, TagPicker } from 'rsuite';

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
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item>
            <h5 className="capitalize">Intersts</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <ButtonToolbar
              onClick={handleOpen}
              className="rounded-full hover:bg-gray/20 text-xl
             hover:text-gray transition  cursor-pointer w-[30px] h-[30px]
              flex items-center justify-center"
            >
              <MdOutlineEdit />
            </ButtonToolbar>

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
                    <Button appearance="primary" onClick={handleSubmit} type="submit">
                      Save
                    </Button>
                  </FlexboxGrid>
                </Form>
              </Modal.Body>
            </Modal>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      <div className="flex gap-2 flex-wrap" key={Math.random()}>
        {interstesList?.map((el) => {
          return (
            <>
              <span className="bg-gray/5 inline-block px-3 rounded-3xl font-[500] cursor-pointer hover:bg-gray/30 transition">
                {el}
              </span>
            </>
          );
        })}
      </div>
    </Panel>
  );
}

export default Interstes;
