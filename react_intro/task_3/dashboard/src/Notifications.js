// task_1/dashboard/src/Notifications.js

import React from 'react';
import './Notifications.css';
import { getLatestNotification } from './utils';

function Notifications() {
  const handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="Notifications">
      <button style={{ position: 'absolute', right: '10px', top: '10px', background: 'transparent', border: 'none', cursor: 'pointer' }} aria-label="Close" onClick={handleCloseClick}>
        x
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
    </div>
  );
}

export default Notifications;
