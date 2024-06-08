import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Footer.css';
import { getFullYear, getFooterCopy } from '../utils/utils';

const Footer = ({ user }) => {
  return (
    <footer className="App-footer">
      <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
      {user && user.isLoggedIn && <p><a href="/contact">Contact us</a></p>}
    </footer>
  );
};

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  }),
};

Footer.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({
  user: state.ui.get('user'),
});

export default connect(mapStateToProps)(Footer);
