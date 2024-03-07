import React from 'react';
import moment from 'moment';
import './myStyles.css';

function MsgToOthers({content}) {
  const formattedTimestamp = content.updatedAt
  ? moment(content.updatedAt).format('HH:mm')
  :moment().format('HH:mm');
  
  return (
    <>
      <sup className='other'>{content?.sender?.name}</sup>
      <div className='message-other'>
        <span>{content.content}
        <sub className='time'>{formattedTimestamp}</sub>
        </span>
      </div>
    </>
  )
}
export default MsgToOthers