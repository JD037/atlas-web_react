// src/BodySection/BodySection.js
import React from 'react';
import PropTypes from 'prop-types';

class BodySection extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySection">
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
}

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default BodySection;