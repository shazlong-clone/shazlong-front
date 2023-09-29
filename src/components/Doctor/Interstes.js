import React, { useRef, useState } from 'react';
import { Button, FlexboxGrid, Form, Schema, TagPicker } from 'rsuite';
import EditModal from './EditModal'
function Interstes() {
    const formRef = useRef();

    const interstesList = [
        ' Adolescence disorders ',
        ' Mood disorders (depression) ',
        ' Anxiety disorders and obsessions ',
        ' Marriage Counselling/Relationship Disorders ',
        ' Addiction ',
        ' Sexual disorders ',
      ];
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
    <EditModal>
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
    </EditModal>

  );
}

export default Interstes;
