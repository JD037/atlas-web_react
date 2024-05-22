import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';
import WithLogging from '../HOC/WithLogging';

const bounceKeyframes = {
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' },
};

const opacityKeyframes = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 },
};

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
    cursor: 'pointer',
    backgroundColor: '#fff8f8',
    float: 'right',
    ':hover': {
      animationName: [bounceKeyframes, opacityKeyframes],
      animationDuration: '0.5s, 1s',
      animationIterationCount: '3, 3',
    },
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
  hidden: {
    display: 'none',
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
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, isLoggedIn } = this.props;

    return (
      <>
        <div
          className={css(styles.menuItem)}
          onClick={() => {
            if (isLoggedIn) handleDisplayDrawer();
          }}
        >
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button className={css(styles.closeBtn)} onClick={handleHideDrawer}>
              &times;
            </button>
            <p className={css(styles.header)}>Here is the list of notifications</p>
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
  handleDisplayDrawer: PropTypes.func.isRequired,
  handleHideDrawer: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

const NotificationsWithLogging = WithLogging(Notifications);

export default NotificationsWithLogging;
