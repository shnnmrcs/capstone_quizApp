/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error, info) {
    console.log('error:', error);
    console.log('info:', info);
    this.setState({ info });
  }

  render() {
    const { children } = this.props;
    const { error, info } = this.state;

    if (error) {
      return (
        <div className="p-4">
          <h1 className="text-2xl text-red-600">{error.message}</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {info?.componentStack}
          </details>
        </div>
      );
    }

    return <div>{children}</div>;
  }
}
