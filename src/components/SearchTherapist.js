import React, { useState } from 'react';
import { Button, Checkbox, Col, Drawer, Grid, Row } from 'rsuite';
import { MdFilterList } from 'react-icons/md';
import { TbArrowsSort } from 'react-icons/tb';
import { DateRangePicker } from 'rsuite';
function SearchTherapist(props) {
  const [open, setOpen] = useState(false);


  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        appearance='ghost'
        className='grow py-0 flex items-center gap-2'
      >
        <MdFilterList /> <span>filter</span>
      </Button>
      <Button appearance='ghost' className='grow py-0 flex items-center gap-2'>
        <TbArrowsSort /> <span>sort</span>
      </Button>

      <Drawer
        open={open}
        size='xs'
        backdrop='static'
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Filters</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className='px-[30px]'>
          <Grid>
            <h5>Availability</h5>
            <Row>
              <Col span={12}>
                
                <Checkbox> Today</Checkbox>
              </Col>
              <Col span={12}>
                
                <Checkbox> This Week</Checkbox>
              </Col>
              <Col span={24}>
                
                <Checkbox> Emergency (Start now within 15 mins)</Checkbox>
              </Col>
            </Row>
            <br />
            <h5>Specific date or range</h5>
            <Row>
              <Col xs={24}>
                <DateRangePicker
                  cleanable
                  block
                  showOneCalendar
                  className='mt-3 w-100'
                />
              </Col>
            </Row>
          </Grid>
        </Drawer.Body>
      </Drawer>

    </>
  );
}

export default SearchTherapist;
