import React from 'react';
import PropTypes from 'prop-types';

const NotificationItem = ({ type, value = '', html = null }) => {
  if (!value && !html) {
    return null;
  }

  return (
    <li data-notification-type={type} dangerouslySetInnerHTML={html}>
      {value}
    </li>
  );
};

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
};

export default NotificationItem;
