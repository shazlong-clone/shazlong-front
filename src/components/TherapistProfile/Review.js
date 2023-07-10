import React, { useRef } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Rate,
} from 'rsuite';
import useMediaQuery from '../../utils/useMediaQuery';
import FormGroup from 'rsuite/esm/FormGroup';
import FormControl from 'rsuite/esm/FormControl';

function Review() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const lg = useMediaQuery('lg');
  const Textarea = React.forwardRef((props, ref) => (
    <Input block={true} {...props} as='textarea' ref={ref} />
  ));
  let ref = useRef();
  return (
    <>
      <Button block={lg ? true : false} onClick={handleOpen} appearance='ghost' size={lg ? 'lg' : 'md'}>
        Write Review
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className='text-cyan text-3xl text-center lg:text-start'>
            Write a review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='lg:px-10 py-5 px-4'>
          <h6 className='text-lg text-center'>
            Your opinion matters, tell us about your experience with
          </h6>
          <p className='text-lg text-center text-cyan mb-5'>Doctor Name</p>
          <Form fluid
            onChange={(values)=>{             
              ref.current = values
            }}
          >
            <FormGroup>
              <Form.ControlLabel className='text-base'>
                How would you rate your experience?
              </Form.ControlLabel>
              <FormControl name='rate' className='mt-2' size='sm' accepter={Rate} />
            </FormGroup>
            <FormGroup>
              <Form.ControlLabel className='text-base'>
                Write something about your experience.
              </Form.ControlLabel>
              <FormControl
                className='mt-2'
                placeholder='write you review here'
                rows={5}
                name='textarea'
                accepter={Textarea}
              />
            </FormGroup>
            <FormGroup>
              <Form.ControlLabel className='text-base'>
              3. Would you recommend this therapist to others?
              </Form.ControlLabel>
              <FormControl
                className='mt-2'
                name='RadioGroup'
                accepter={RadioGroup}
              >
                <Radio value='Yes'>Yes</Radio>
                <Radio value='no'>no</Radio>
              </FormControl>
            </FormGroup>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance='primary'>
            Ok
          </Button>
          <Button onClick={handleClose} appearance='subtle'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Review;
