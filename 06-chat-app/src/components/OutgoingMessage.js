import React from 'react';
import { parseTime } from '../helpers/parseTime';

export const OutgoingMessage = ({ msg }) => {
  return (
    <div className='outgoing_msg'>
      <div className='sent_msg'>
        <p>{msg.message}</p>
        <span className='time_date'>{parseTime(msg.createdAt)}</span>
      </div>
    </div>
  );
};
