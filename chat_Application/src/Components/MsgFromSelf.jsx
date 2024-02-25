import React from 'react';
import './myStyles.css';

function MsgFromSelf({content}) {

  const utcTimestamp = new Date(content.updatedAt);
  // Convert to Indian Standard Time (IST)
  const options = {
   timeZone: 'Asia/Kolkata',
   hour12: false, // 24-hour format
   hour: '2-digit', // display hours
   minute: '2-digit', // display minutes
 };

 // Convert to Indian Standard Time (IST)
 const istTimestamp = utcTimestamp.toLocaleString('en-IN', options);

  return (
    <div className='message-self'>
    <span>{content.content}
    <span className='time'>{istTimestamp}</span>
    </span>
</div>
  )
}

export default MsgFromSelf