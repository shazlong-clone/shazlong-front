import React, { useRef } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { ButtonToolbar, FlexboxGrid,Modal, Panel } from 'rsuite';

function EditModal({children}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const interstesList = [
    ' Adolescence disorders ',
    ' Mood disorders (depression) ',
    ' Anxiety disorders and obsessions ',
    ' Marriage Counselling/Relationship Disorders ',
    ' Addiction ',
    ' Sexual disorders ',
  ];
  return (
    <Panel
      className="bg-white mb-6"
      header={
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item>
            <h5 className="capitalize">Intersts</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <ButtonToolbar
              onClick={handleOpen}
              className="rounded-full hover:bg-gray/20 text-xl
             hover:text-gray transition  cursor-pointer w-[30px] h-[30px]
              flex items-center justify-center"
            >
              <MdOutlineEdit />
            </ButtonToolbar>

            <Modal backdrop="static" open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title>Edit Intersts</Modal.Title>
              </Modal.Header>
                <Modal.Body style={{ overflow: 'visible', paddingBottom:'0px' ,marginTop:'0px'}}>
                  {children}

                </Modal.Body>
            </Modal>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      <div className="flex gap-2 flex-wrap" key={Math.random()}>
        {interstesList?.map((el) => {
          return (
            <>
              <span className="bg-gray/5 inline-block px-3 rounded-3xl font-[500] cursor-pointer hover:bg-gray/30 transition">
                {el}
              </span>
            </>
          );
        })}
      </div>
    </Panel>
  );
}

export default EditModal;
