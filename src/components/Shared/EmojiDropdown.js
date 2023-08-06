import React, { useRef, useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { BsEmojiSmile } from 'react-icons/bs';
import clsx from 'clsx';

const EmojiDropdown = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative flex items-center">
      <div className={clsx('absolute bottom-[60px] right-0', !showEmojiPicker && 'hidden')}>
        <Picker
          theme="dark"
          onClickOutside={(s) => {
            console.log('cloikec ouside');
          }}
          onEmojiSelect={handleEmojiSelect}
          data={data}
          title="Pick your emoji"
        />
      </div>
      <button className="bg-transparent" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <BsEmojiSmile className={clsx('flex items-center cursor-pointer', showEmojiPicker && 'text-cyan')} />
      </button>
    </div>
  );
};

export default EmojiDropdown;
