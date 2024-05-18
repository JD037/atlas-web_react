// task_5/dashboard/src/Notifications/NotificationItem.js
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  defaultItem: {
    color: 'rgb(0, 62, 155)',
  },
  urgentItem: {
    color: 'rgb(219, 0, 0)',
  },
});

class NotificationItem extends React.PureComponent {
  render() {
    const { id, type, value, html, markAsRead } = this.props;

    if (html) {
      return (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        ></li>
      );
    }
    return (
      <li data-notification-type={type} onClick={() => markAsRead(id)}>
        {value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
};

export default NotificationItem;