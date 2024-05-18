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
    '@media (max-width: 900px)': {
      width: '100%',
      height: '100%',
      top: '0',
      right: '0',
      border: 'none',
      padding: '0',
      fontSize: '20px',
    },
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
  panelOpen: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    zIndex: 2,
    padding: '0',
    fontSize: '20px',
  },
  ul: {
    padding: 0,
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
          <div className={css(styles.notifications, styles.panelOpen)}>
            {listNotifications.length === 0 ? (
              <NotificationItem value="No new notification for now" />
            ) : (
              <ul className={css(styles.ul)}>
                {listNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={this.markAsRead}
                  />
                ))}
              </ul>
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
