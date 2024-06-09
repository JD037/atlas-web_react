import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';

const styles = StyleSheet.create({
  courseList: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '1.2rem',
  },
  th: {
    border: '1px solid #ccc',
    padding: '0.5rem',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid #ccc',
    padding: '0.5rem',
    textAlign: 'left',
  },
});

const CourseList = ({ listCourses, fetchCourses, selectCourse, unSelectCourse }) => {
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onChangeRow = (id, checked) => {
    if (checked) {
      selectCourse(id);
    } else {
      unSelectCourse(id);
    }
  };

  return (
    <table id="CourseList" className={css(styles.courseList)}>
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
      </thead>
      <tbody>
        {listCourses.size === 0 ? (
          <CourseListRow textFirstCell="No course available yet" isHeader={false} />
        ) : (
          listCourses.map((course) => (
            <CourseListRow
              key={course.get('id')}
              textFirstCell={course.get('name')}
              textSecondCell={course.get('credit')}
              isHeader={false}
              isChecked={course.get('isSelected')}
              onChangeRow={(checked) => onChangeRow(course.get('id'), checked)}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  listCourses: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  listCourses: getListCourses(state),
});

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

const CourseListWithLogging = WithLogging(CourseList);

export default connect(mapStateToProps, mapDispatchToProps)(CourseListWithLogging);
