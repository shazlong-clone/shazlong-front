import React, { useEffect, useRef, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  CheckboxGroup,
  Form,
  Input,
  InputGroup,
  InputPicker,
  Schema,
  Uploader,
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

import SearchTherapist from '../components/SearchTherapist';
import TherapistsCard from '../components/TherapistsCard';
function Therapists() {

  const formValue = useRef()

  const model = Schema.Model({
    email: Schema.Types.StringType().isRequired('This field is required.'),
    password: Schema.Types.StringType().isRequired(
      'Please enter a valid email address.'
    ),
  });

  useEffect(() => {
    console.log(formValue.current);
  }, [formValue.current]);
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
          <SearchTherapist />
        </article>
      </section>
      <section>
        <TherapistsCard />
      </section>
      <section className='mb-10'>
        <Form
          model={model}
          onChange={(values) => formValue.current = values}
          onSubmit={(isSubmited)=> formValue?.current }
        >
          <Form.Group controlId='1'>
            <Form.ControlLabel>email</Form.ControlLabel>
            <Form.Control name='email' />
            <Form.HelpText tooltip>this filed is required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId='2'>
            <Form.ControlLabel>pass</Form.ControlLabel>
            <Form.Control type='password' name='password' />
            <Form.HelpText tooltip>this filed is required</Form.HelpText>
          </Form.Group>
            <Button appearance='primary'  type='submit' onClick={()=> console.log()}>
              Submit
            </Button>
        </Form>
      </section>
    </div>
  );
}

export default Therapists;
