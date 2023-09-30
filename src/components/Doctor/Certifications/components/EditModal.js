import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { IconButton, Modal } from 'rsuite';
import CertficationForm from './CertficationForm';

function EditModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<MdOutlineEdit />} />

      <Modal size="lg" backdrop="static" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Certifications</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'visible', maxHeight: 'fit-content', paddingBottom: '0px', marginTop: '0px' }}>
          <CertficationForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;
