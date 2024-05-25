import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { BsEmojiSmile } from 'react-icons/bs';
import clsx from 'clsx';
import { IconButton } from 'rsuite';

const EmojiDropdown = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative flex items-center">
      <div className={clsx('absolute bottom-[60px] left-0', !showEmojiPicker && 'hidden')}>
        <Picker theme="dark" onEmojiSelect={handleEmojiSelect} data={data} title="Pick your emoji" />
      </div>
      <IconButton style={{ padding: '10px' }} circle onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <BsEmojiSmile className={clsx('flex items-center cursor-pointer text-[18px]', showEmojiPicker && 'text-cyan')} />
      </IconButton>
    </div>
  );
};

export default EmojiDropdown;
