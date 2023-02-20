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
    // console.log('error', error);
    // console.log('info', info);

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

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// export default class ErrorBoundary extends Component {
//   static propTypes = {
//     children: PropTypes.element.isRequired,
//   };

//   state = {
//     hasError: false,
//     error: { message: '', stack: '' },
//     info: { componentStack: '' },
//   };

//   static getDerivedStateFromError = error => ({ hasError: true });

//   componentDidCatch(error, info) {
//     this.setState({ error, info });
//   }

//   render() {
//     const { children } = this.props;
//     const { hasError, error, info } = this.state;
//     console.log('error', error);
//     console.log('info', info);

//     if (hasError) {
//       return (
//         <div className='p-4'>
//           <h1 className="text-2xl text-red-600">{error.message}</h1>
//           <details style={{ whiteSpace: 'pre-wrap' }}>
//             {error && error.toString()}
//             <br />
//             {info.componentStack}
//           </details>
//         </div>
//       );
//     }

//     return <div>{children}</div>;
//   }
// }
