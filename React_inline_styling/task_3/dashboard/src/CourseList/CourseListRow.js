import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545',
  },
  defaultRow: {
    backgroundColor: '#f5f5f5ab',
  },
  th: {
    border: '1px solid #ccc',
    padding: '0.5rem',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ccc',
    padding: '0.5rem',
    textAlign: 'left',
  },
});

const CourseListRow = ({ isHeader, textFirstCell, textSecondCell }) => {
  const rowStyle = isHeader ? styles.headerRow : styles.defaultRow;

  return (
    <tr className={css(rowStyle)}>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan={2} className={css(styles.th)}>{textFirstCell}</th>
        ) : (
          <>
            <th className={css(styles.th)}>{textFirstCell}</th>
            <th className={css(styles.th)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className={css(styles.td)}>{textFirstCell}</td>
          <td className={css(styles.td)}>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
