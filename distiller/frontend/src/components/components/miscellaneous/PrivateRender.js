import React, { Fragment } from 'react';
//  import { Route} from 'react-router-dom';
//  import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-fragments  */
/* eslint-disable react/jsx-props-no-spreading  */

const PrivateRender = ({ component: Component, isLoading, isAuthenticated, ...rest }) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (!isAuthenticated) {
    return <Fragment />;
  }
  return <Component {...rest} />;
};

PrivateRender.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRender;

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps)(PrivateRoute);
