import React, { useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  CheckboxGroup,
  Divider,
  Drawer,
  FlexboxGrid,
  Form,
  RangeSlider,
  Rate,
  SelectPicker,
  TagPicker,
} from 'rsuite';
import { MdFilterList } from 'react-icons/md';
import { TbArrowsSort } from 'react-icons/tb';
import { DateRangePicker } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
function SearchTherapist(props) {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const data = [
    'Eugenia',
    'Bryan',
    'Linda',
    'Nancy',
    'Lloyd',
    'Alice',
    'Julia',
    'Albert',
  ].map((item) => ({ label: item, value: item }));

  const selectData = [
    'Eugenia',
    'Bryan',
    'Linda',
    'Nancy',
    'Lloyd',
    'Alice',
    'Julia',
    'Albert',
  ].map((item) => ({
    label: item,
    value: item,
  }));
  const filterMenu = [
    {
      name:'Fees (From low to high)'
    },
    {
      name:'Fees (From low to high)'
    },
    {
      name:'Top rated therapists '
    }
  ]
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        appearance='ghost'
        className='grow py-0 flex items-center gap-2'
      >
        <MdFilterList /> <span>filter</span>
      </Button>
      <Button   onClick={() => setFilterOpen(true)} appearance='ghost' className='grow py-0 flex items-center gap-2'>
        <TbArrowsSort /> <span>sort</span>
      </Button>

      <Drawer
        open={open}
        size='xs'
        backdrop='static'
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-2xl text-center text-gray'>
            Filters
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className='px-[30px]'>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel className='font-bold text-lg text-cyan'>
                Availability
              </Form.ControlLabel>
              <Form.Control name='availability' inline accepter={CheckboxGroup}>
                <Checkbox value='Today'>Today</Checkbox>
                <Checkbox value='Now'>Now</Checkbox>
                <Checkbox value='This_Week'>This Week</Checkbox>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel className='font-bold text-lg text-cyan mb-3'>
                {' '}
                Specific date or range{' '}
              </Form.ControlLabel>
              <Form.Control
                name='date'
                block
                cleanable
                showOneCalendar
                accepter={DateRangePicker}
              />
            </Form.Group>
            <Form.Group controlId='selectPicker'>
              <Form.ControlLabel className='font-bold text-lg text-cyan'>
                Country:
              </Form.ControlLabel>
              <Form.Control
                preventOverflow
                palcement='bottomStart'
                menuMaxHeight={200}
                name='selectPicker'
                accepter={SelectPicker}
                data={selectData}
                block
              />
            </Form.Group>
            <Form.Group controlId='selectPicker'>
              <Form.ControlLabel className='font-bold text-lg text-cyan'>
                Region:
              </Form.ControlLabel>
              <Form.Control
                name='region'
                preventOverflow
                menuMaxHeight={200}
                palcement='bottomStart'
                accepter={SelectPicker}
                data={selectData}
                block
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel className='font-bold text-lg text-cyan mb-3'>
                {' '}
                Areas of interest
              </Form.ControlLabel>
              <Form.Control
                name='intersrt'
                accepter={TagPicker}
                data={data}
                block
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel className='font-bold text-lg text-cyan'>
                Therapist Gender
              </Form.ControlLabel>
              <Form.Control name='gender' inline accepter={CheckboxGroup}>
                <Checkbox value='Male'>Male</Checkbox>
                <Checkbox value='Female'>Female</Checkbox>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel className='font-bold text-lg text-cyan'>
                Therapist Gender
              </Form.ControlLabel>
              <Form.Control name='rate' accepter={Rate} />
            </Form.Group>

            <Form.Group controlId='slider'>
              <Form.ControlLabel className='font-bold text-lg text-cyan b'>
                <FlexboxGrid justify='space-between'>
                  <FlexboxGridItem>Feez:</FlexboxGridItem>
                  <FlexboxGridItem>Egy</FlexboxGridItem>
                </FlexboxGrid>
              </Form.ControlLabel>
              <Form.Control
                className='slider-custom'
                accepter={RangeSlider}
                name='slider'
                label='Level'
              />
            </Form.Group>
            <ButtonToolbar>
              <Button appearance='primary' type='submit'>
                Submit
              </Button>
              <Button appearance='gohst' type='rest'>
                Cancel
              </Button>
            </ButtonToolbar>
          </Form>
        </Drawer.Body>
      </Drawer>
      <Drawer
        open={filterOpen}
        size='xs'
        placement='bottom'
        onClose={() => setFilterOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-2xl text-center text-gray'>
            Filters
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className='px-[0px] py-3'>
            <ul className='list-none pl-0 text-center'>
              {
                filterMenu?.map(el => {
                  return <>
                    <li key={Math.random()} className='px-3'>{el?.name}</li>
                    <Divider className='my-3' />
                  </>
                })
              }
              <li className='text-red-700'>Rest</li>
            </ul>
        </Drawer.Body>
      </Drawer>

    </>
  );
}

export default SearchTherapist;
