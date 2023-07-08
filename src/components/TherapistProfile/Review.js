import React from 'react';
import {
  Button,
  ButtonToolbar,
  Form,
  Input,
  Modal,
  Placeholder,
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

  return (
    <>
      <Button onClick={handleOpen} appearance='ghost' size={lg ? 'lg' : ''}>
        Write Review
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className='text-cyan text-3xl'>
            Write a review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-10 py-5'>
          <h6 className='text-lg text-center'>
            Your opinion matters, tell us about your experience with
          </h6>
          <p className='text-lg text-center text-cyan mb-5'>Doctor Name</p>
          <Form fluid>
            <Form.ControlLabel className='text-base'>
              How would you rate your experience?
            </Form.ControlLabel>

            <FormGroup>
              <FormControl className='mt-2' size='sm' accepter={Rate} />
            </FormGroup>
            <Form.ControlLabel className='text-base'>
              Write something about your experience.
            </Form.ControlLabel>
            <FormGroup>
              <FormControl 
                className='mt-2'
                placeholder='write you review here'
                rows={5}
                name='textarea'
                accepter={Textarea}
              />
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
