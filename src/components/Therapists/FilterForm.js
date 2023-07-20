import React from 'react';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  CheckboxGroup,
  FlexboxGrid,
  Form,
  InputPicker,
  RangeSlider,
  Rate,
  SelectPicker,
  TagPicker,
} from 'rsuite';
import { DateRangePicker } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
function FilterForm() {
  const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map((item) => ({
    label: item,
    value: item,
  }));

  const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map((item) => ({
    label: item,
    value: item,
  }));
  return (
    <div className="lg:bg-white lg:p-5 lg:rounded-3xl">
      <h3 className="text-center hidden lg:block">Filter</h3>
      <hr className="hidden lg:block" />
      <Form fluid>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">Availability</Form.ControlLabel>
          <Form.Control name="availability" accepter={CheckboxGroup}>
            <Checkbox value="Today">Today</Checkbox>
            <Checkbox value="Now">Now</Checkbox>
            <Checkbox value="This_Week">This Week</Checkbox>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan mb-3">Specific date or range</Form.ControlLabel>
          <Form.Control name="date" block cleanable showOneCalendar accepter={DateRangePicker} />
        </Form.Group>
        <Form.Group controlId="selectPicker">
          <Form.ControlLabel className="font-bold text-lg text-cyan">Country:</Form.ControlLabel>
          <Form.Control
            preventOverflow
            palcement="bottomStart"
            menuMaxHeight={200}
            name="selectPicker"
            accepter={InputPicker}
            data={selectData}
            block
          />
        </Form.Group>
        <Form.Group controlId="selectPicker">
          <Form.ControlLabel className="font-bold text-lg text-cyan">Region:</Form.ControlLabel>
          <Form.Control
            name="region"
            preventOverflow
            menuMaxHeight={200}
            palcement="bottomStart"
            accepter={SelectPicker}
            data={selectData}
            block
          />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan mb-3">Areas of interest</Form.ControlLabel>
          <Form.Control name="intersrt" accepter={TagPicker} data={data} block />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">Therapist Gender</Form.ControlLabel>
          <Form.Control name="gender" inline accepter={CheckboxGroup}>
            <Checkbox value="Male">Male</Checkbox>
            <Checkbox value="Female">Female</Checkbox>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">Therapist Gender</Form.ControlLabel>
          <Form.Control name="rate" accepter={Rate} />
        </Form.Group>

        <Form.Group controlId="slider">
          <Form.ControlLabel className="font-bold text-lg text-cyan b">
            <FlexboxGrid justify="space-between">
              <FlexboxGridItem>Feez:</FlexboxGridItem>
              <FlexboxGridItem>Egy</FlexboxGridItem>
            </FlexboxGrid>
          </Form.ControlLabel>
          <Form.Control className="slider-custom" accepter={RangeSlider} name="slider" label="Level" />
        </Form.Group>
        <ButtonToolbar className="flex justify-center">
          <Button appearance="primary" type="submit">
            Submit
          </Button>
          <Button appearance="ghost" type="reset">
            Cancel
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
}

export default FilterForm;
