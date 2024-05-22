// task_4/dashboard/src/HOC/WithLogging.js
import React from 'react';

const WithLogging = (WrappedComponent) => {
  class WithLogging extends React.Component {
    componentDidMount() {
      const componentName = WrappedComponent.displayName || 'Component';
      console.log(`Component ${componentName} is mounted`);
    }

    componentWillUnmount() {
      const componentName = WrappedComponent.displayName || 'Component';
      console.log(`Component ${componentName} is going to unmount`);
    }

    render() {
      const { ...props } = this.props;
      const componentName = WrappedComponent.displayName || 'Component';
      WithLogging.displayName = `WithLogging(${componentName})`;

      return <WrappedComponent {...props} />;
    }
  }

  return WithLogging;
};

export default WithLogging;
