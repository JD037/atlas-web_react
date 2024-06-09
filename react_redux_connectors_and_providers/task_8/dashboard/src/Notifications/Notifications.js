import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNotifications, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import WithLogging from '../HOC/WithLogging';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';
import { Map } from 'immutable';

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
    position: 'fixed',
    top: '10px',
    right: '10px',
    border: '1px dashed #e1354b',
    padding: '1rem',
    width: '25rem',
    backgroundColor: 'white',
    zIndex: 1,
    '@media (max-width: 700px)': {
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
    backgroundColor: 'transparent',
    float: 'right',
    ':hover': {
      animationName: [bounceKeyframes, opacityKeyframes],
      animationDuration: '0.5s, 1s',
      animationIterationCount: '3, 3',
    },
    '@media (max-width: 700px)': {
      textAlign: 'center',
      width: '100%',
    },
  },
  menuItemAnimated: {
    animationName: [bounceKeyframes, opacityKeyframes],
    animationDuration: '0.5s, 1s',
    animationIterationCount: '3, 3',
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
  filterButton: {
    marginRight: '10px',
    cursor: 'pointer',
  },
});

class Notifications extends React.PureComponent {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markAsRead, setNotificationFilter } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button className={css(styles.closeBtn)} onClick={handleHideDrawer}>
              &times;
            </button>
            <p className={css(styles.header)}>Here is the list of notifications</p>
            <div>
              <button className={css(styles.filterButton)} onClick={() => setNotificationFilter('urgent')}>‼️</button>
              <button className={css(styles.filterButton)} onClick={() => setNotificationFilter('default')}>?</button>
            </div>
            {listNotifications.size === 0 ? (
              <NotificationItem value="No new notification for now" />
            ) : (
              <ul className={css(styles.ul)}>
                {listNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.get('id')}
                    id={notification.get('id')}
                    type={notification.getIn(['context', 'type'])}
                    value={notification.getIn(['context', 'value'])}
                    html={notification.getIn(['context', 'html'])}
                    markAsRead={() => markAsRead(notification.get('id'))}
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
  listNotifications: PropTypes.object.isRequired,
  handleDisplayDrawer: PropTypes.func.isRequired,
  handleHideDrawer: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  setNotificationFilter: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: Map(),
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markAsRead: () => {},
  fetchNotifications: () => {},
  setNotificationFilter: () => {},
};

const mapStateToProps = (state) => ({
  listNotifications: getUnreadNotificationsByType(state),
});

const mapDispatchToProps = {
  fetchNotifications,
  markAsRead,
  setNotificationFilter,
};

const NotificationsWithLogging = WithLogging(Notifications);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsWithLogging);
