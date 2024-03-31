import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './myStyles.css';

function MsgFromSelf({ content }) {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    // Retrieve user preference from localStorage
    const storedIsUser = localStorage.getItem('isUser');
    
    // Set isUser state based on the retrieved preference
    setIsUser(storedIsUser === 'true');
  }, []);

  useEffect(() => {
    // Update localStorage whenever isUser state changes
    localStorage.setItem('isUser', isUser);
  }, [isUser]);

  const formattedTimestamp = content?.updatedAt
    ? moment(content?.updatedAt).format('HH:mm')
    : moment().format('HH:mm');

  // Function to extract emoji URL from message content
  const getEmojiUrl = (content) => {
    const regex = /(https?:\/\/[^\s]+\.png)/; // Regular expression to match PNG image URLs
    const match = content.match(regex);
    return match ? match[0] : null;
  };

  return (
    <>
      <sup className={isUser ? 'me' : 'other'}>{isUser ? 'you' : 'other'}</sup>
      <div className={isUser ? 'message-self' : 'message-other'}>
        <span>
          {content?.content}
          <sub className='time'>{formattedTimestamp}</sub>
        </span>
      </div>
      {getEmojiUrl(content?.content) && (
        <img src={getEmojiUrl(content?.content)} alt="Emoji" className="emoji-image" />
      )}
    </>
  );
}

export default MsgFromSelf;