import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import WithLogging from '../HOC/WithLogging';

const styles = StyleSheet.create({
  notifications: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: '1px dashed #e1354b',
    padding: '1rem',
    width: '25rem',
    backgroundColor: 'white',
    zIndex: 1,
  },
  menuItem: {
    textAlign: 'right',
    marginRight: '1rem',
    fontWeight: 'bold',
  },
  defaultNotification: {
    color: 'rgb(0, 62, 155)',
  },
  urgentNotification: {
    color: 'rgb(219, 0, 0)',
  },
});

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    const { listNotifications } = this.props;
    return nextProps.listNotifications.length > listNotifications.length;
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)}>Your notifications</div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            {listNotifications.length === 0 ? (
              <NotificationItem value="No new notification for now" />
            ) : (
              listNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={this.markAsRead}
                  style={notification.type === 'urgent' ? styles.urgentNotification : styles.defaultNotification}
                />
              ))
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

const NotificationsWithLogging = WithLogging(Notifications);

export default NotificationsWithLogging;
