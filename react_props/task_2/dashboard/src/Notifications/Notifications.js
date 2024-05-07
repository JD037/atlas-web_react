import React from 'react';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

function Notifications() {
  const handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  return (
    <div className="Notifications">
      <button
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Close"
        onClick={handleCloseClick}
      >
        x
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        {listNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            value={notification.value}
            html={notification.html}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
