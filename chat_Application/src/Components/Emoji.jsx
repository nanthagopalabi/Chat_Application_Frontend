import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';


const Emoji = ({ onEmojiSelect }) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const {message}=useSelector((state)=>state.chat);

  const handleToggleEmojiPicker = () => {
    setEmojiPickerOpen((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    // Combine the emoji with any existing message content
    const newContent = `${message.content || ''}${emoji}`;
    // Call the function to send the message
    handleSendMessage(newContent);
    // Close the emoji picker
    setEmojiPickerOpen(false);
  };
  

  return (
    <div>
      <button onClick={handleToggleEmojiPicker}>🙂</button> 

      {emojiPickerOpen && (
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          style={{ position: 'absolute', bottom: '80px', right: '20px' }}
        />
      )}
    </div>
  );
};

export default Emoji;
