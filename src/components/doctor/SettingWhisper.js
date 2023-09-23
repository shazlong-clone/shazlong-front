import React from 'react';
import { Divider, Dropdown, IconButton, Popover, Whisper } from 'rsuite';
import { AiOutlineSetting } from 'react-icons/ai';

const DefaultPopover = React.forwardRef(({ ...props }, ref) => {
  return (
    <Popover style={{ padding: '0px' }} ref={ref} {...props} full>
      <Dropdown.Menu>
        <Dropdown.Item>New File</Dropdown.Item>
        <Dropdown.Item>New File</Dropdown.Item>
        <Dropdown.Item>Download As...</Dropdown.Item>
        <Dropdown.Item>Export PDF</Dropdown.Item>
        <Dropdown.Item>Export HTML</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
});

const WhisperComp = ({ placement }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={<DefaultPopover content={`I am positioned to the ${placement}`} />}
  >
    <IconButton className="bg-transparent" icon={<AiOutlineSetting className="text-xl" />} />
  </Whisper>
);

export default WhisperComp;
