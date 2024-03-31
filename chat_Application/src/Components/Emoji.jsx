import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const Emoji = ({ onEmojiSelect }) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleToggleEmojiPicker = () => {
    setEmojiPickerOpen((prev) => !prev);
  };

  const handleEmojiSelect = (emojiObject) => {
    if (emojiObject) {
      const emojiUrl = emojiObject?.target?.currentSrc;
      onEmojiSelect(emojiUrl);
      setEmojiPickerOpen(false);
    }
  };

  return (
    <div>
      <button onClick={handleToggleEmojiPicker}>🙂</button>
      {emojiPickerOpen && (
        <EmojiPicker
          onEmojiClick={(_, emojiObject) => handleEmojiSelect(emojiObject)}
          disableSearchBar
          disableSkinTonePicker
          groupVisibility={{
            recently_used: false
          }}
        />
      )}
    </div>
  );
};

export default Emoji;
