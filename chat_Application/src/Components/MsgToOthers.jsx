import React from 'react';
import './myStyles.css';

function MsgToOthers({content}) {

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

console.log(istTimestamp);
  return (
    <div className='message-other'>
    <span>{content.content}
    <span className='time'>{istTimestamp}</span>
    </span>
    </div>
  )
}
export default MsgToOthers