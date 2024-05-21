import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import WithLogging from '../HOC/WithLogging';

const styles = StyleSheet.create({
  notifications: {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    border: '1px dashed #e1354b',
    padding: '1rem',
    backgroundColor: 'white',
    zIndex: 1,
    '@media (max-width: 900px)': {
      border: 'none',
      padding: '0',
      fontSize: '20px',
    },
  },
  menuItem: {
    textAlign: 'right',
    marginRight: '1rem',
    fontWeight: 'bold',
    '@media (max-width: 900px)': {
      textAlign: 'center',
      width: '100%',
    },
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  ul: {
    padding: 0,
    listStyle: 'none',
    fontSize: '20px',
  },
  header: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
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

  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)}>Your notifications</div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button className={css(styles.closeBtn)} onClick={() => this.props.toggleDrawer()}>×</button>
            <h2 className={css(styles.header)}>Here is the list of notifications</h2>
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
  toggleDrawer: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

const NotificationsWithLogging = WithLogging(Notifications);

export default NotificationsWithLogging;
