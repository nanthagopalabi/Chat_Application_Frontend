import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const Emoji = () => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleToggleEmojiPicker = () => {
    setEmojiPickerOpen((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    // Handle the selected emoji
    console.log(`Selected emoji: ${emoji}`);
    setEmojiPickerOpen(false);
  };

  return (
    <div>
      <button onClick={handleToggleEmojiPicker}>🙂</button> 

      {emojiPickerOpen && (
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          style={{ position: 'absolute', bottom: '50px', right: '10px' }}
        />
      )}
    </div>
  );
};

export default Emoji;
