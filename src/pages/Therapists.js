import React from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Col, Grid, Input, InputGroup, InputPicker, Row } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import SearchTherapist from '../components/SearchTherapist';
import TherapistsCard from '../components/TherapistsCard';
import FilterForm from '../components/FilterForm';
import {filterMenu} from '../costansts/index';

function Therapists() {
  return (
    <main className='bg-cyan/5'>
    <div className='container py-4 min-h-[calc(100vh-74px)] max-w-6xl'>
      <section className='flex justify-between items-center lg:mb-10'>
        <h3>
          <Link to='/' className='flex items-center text-gray'>
            <BsArrowLeftCircle />
          </Link>
        </h3>
        <h3>Therapist List</h3>
        <h3>&nbsp; &nbsp;</h3>
      </section>
      <section className='mt-3'>
        <Grid fluid>
          <Row>
            <Col xs={24} lg={16}>
              <InputGroup size='lg' inside className='mb-10'>
                <Input  placeholder='Search by Therapist Name' />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </Col>
            <Col xsHidden mdHidden lg={8}>
              <InputPicker size='lg' data={filterMenu} />
            </Col>
          </Row>
        </Grid>
      </section>
      <section className='flex justify-between gap-3 lg:hidden'>
        <SearchTherapist />
      </section>
      <Grid fluid>
        <Row>
          <Col mdHidden xsHidden lg={8}>
            <FilterForm />
          </Col>
          <Col className='px-0 lg:px-[5px]' xs={24} lg={16}>
            <TherapistsCard />
          </Col>
        </Row>
      </Grid>
    </div>
    </main>
  );
}

export default Therapists;
