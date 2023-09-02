import RCForm, { Field, useForm } from 'rc-field-form';
import { Col, Form, Grid, Input, Row, Schema } from 'rsuite';
const { StringType } = Schema.Types;

const Demo = () => {
  const [form] = useForm();
  const model = Schema.Model({
    name: StringType().isRequired('This field is required.'),
    email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
  });
  return (
    <RCForm
      model={model}
      form={form}
      onFinish={() => {
        form.resetFields();
      }}
      initialValues={{
        username: 'saeed',
        password: 12345,
      }}
    >
      <Grid fluid className="mb-5">
        <Row>
          <Col xs={8}>
            <Field name="username">
              <Form.HelpText>This field is required</Form.HelpText>
              <Input placeholder="Default username" />
            </Field>
          </Col>
          <Col xs={8}>
            <Field name="password">
              <Form.HelpText>this is Help Text</Form.HelpText>
              <Input placeholder="Default username" />
            </Field>
          </Col>
          <Col>
            <Form.HelpText>this is Help Text</Form.HelpText>
            <button>Submit</button>
          </Col>
        </Row>
      </Grid>
    </RCForm>
  );
};

export default Demo;
