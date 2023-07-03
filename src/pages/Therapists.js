import React, {useState} from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Button, Checkbox, Col, Drawer, Grid, Input, InputGroup, Rate, Row, Stack } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { MdFilterList } from 'react-icons/md';
import { TbArrowsSort } from 'react-icons/tb';
import { BsPersonSquare } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import { GiCash } from 'react-icons/gi';
import { DateRangePicker } from 'rsuite';

function Therapists(props) {
    const [open, setOpen] = useState(false);

  return (
    <div className='container py-4 bg-cyan/5 min-h-[calc(100vh-74px)] pb-[90px] lg:pb-0'>
      <section className='flex justify-between items-center'>
        <h3>
          <Link to='/' className='flex items-center text-gray'>
            <BsArrowLeftCircle />
          </Link>
        </h3>
        <h4>Therapist List</h4>
        <h3>&nbsp; &nbsp;</h3>
      </section>
      <section className='mt-3'>
        <InputGroup inside className='mb-10'>
          <Input placeholder='Search by Therapist Name' />
          <InputGroup.Button>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
        <article className='flex justify-between gap-3'>
          <Button
            onClick={() => setOpen(true)}
            appearance='ghost'
            className='grow py-0 flex items-center gap-2'
          >
            <MdFilterList /> <span>filter</span>
          </Button>
          <Button
            appearance='ghost'
            className='grow py-0 flex items-center gap-2'
          >
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
                        <Col span={12}> <Checkbox> Today</Checkbox> </Col>
                        <Col span={12}> <Checkbox> This Week</Checkbox> </Col>
                        <Col span={24}> <Checkbox> Emergency (Start now within 15 mins)</Checkbox> </Col>
                    </Row>
                    <br />
                    <h5>Specific date or range</h5>
                    <Row>
                        <Col xs={24}><DateRangePicker cleanable block showOneCalendar className='mt-3 w-100' /></Col>
                    </Row>
                </Grid>
               
              </Drawer.Body>
            </Drawer>

        </article>
      </section>
      {Array(5)
        .fill('')
        ?.map((el) => {
          return (
            <>
              <section className='bg-white rounded-3xl mt-3 p-6 text-sm'>
                <div className='flex gap-5'>
                  <Badge color='green'>
                    <Avatar
                      size='lg'
                      circle={true}
                      src='https://scontent.shezlong.com/therapist_profile_pictures/47164-f77d757bedb7b0f4ae9ecc5da5069600.webp'
                      alt='@superman66'
                    />
                  </Badge>
                  <article className='grow'>
                    <p>Mohamed Abdelwareth</p>
                    <div className='flex justify-between text-xs my-1 text-cyan'>
                      <section>Psychiatrist</section>
                      <section>
                        <BsPersonSquare /> <span>25+</span>{' '}
                        <span>Sessions</span>
                      </section>
                    </div>
                    <Rate size='xs' defaultValue={3} />
                    <div className='text-xs'>5(3 Reviews)</div>
                  </article>
                </div>
                <p className='my-2'>Interests:</p>
                <div className='flex flex-wrap gap-2 text-xs'>
                  {['Communication Disorders', 'PTSD']?.map((el) => {
                    return (
                      <section className='bg-green/10 text-green rounded-xl px-3 py-1'>
                        {el}
                      </section>
                    );
                  })}
                </div>
                <div className='my-2 flex items-center text-xs gap-1'>
                  <i className='text-xl text-cyan flex items-center'>
                    <GiAlarmClock />
                  </i>
                  <date>Nearest session : Thursday, Jul. 27 at 10:00 AM </date>
                </div>
                <div className='flex items-center gap-1'>
                  <i className='text-xl text-cyan flex items-center'>
                    <GiCash />
                  </i>
                  <amount className='text-cyan font-bold'> EGP 450 </amount>{' '}
                  <period>/ 30 mins </period>
                  <amount className='text-cyan font-bold'>
                    {' '}
                    EGP 900{' '}
                  </amount>{' '}
                  <period>/ 60 mins </period>
                </div>
                <Stack justifyContent='space-around' className='mt-5'>
                  <Button>View Profile</Button>
                  <Button appearance='primary'>Book Now</Button>
                </Stack>
              </section>
            </>
          );
        })}
    </div>
  );
}

export default Therapists;
