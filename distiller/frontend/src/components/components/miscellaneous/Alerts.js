import React, { Component, Fragment } from 'react';
//  import { withAlert } from 'react-alert';
//  import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
//  import { propTypes } from 'react-bootstrap/esm/Image';
/* eslint-disable react/state-in-constructor  */
/* eslint-disable react/no-did-update-set-state  */
/* eslint-disable react/jsx-fragments  */
/* eslint-disable react/forbid-prop-types  */

export default class Alerts extends Component {
  state = { variant: 'danger', message: '', visibility: false };

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.name) {
        this.setState((state) => {
          return { ...state, message: error.msg.name.join(), variant: 'danger' };
        });
        //  alert.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.email) {
        this.setState((state) => {
          return { ...state, message: error.msg.email.join(), variant: 'danger' };
        });
        //  alert.error(`Email: ${error.msg.email.join()}`);
      }
      if (error.msg.message) {
        this.setState((state) => {
          return { ...state, message: error.msg.message.join(), variant: 'danger' };
        });
        //  alert.error(`Message: ${error.msg.message.join()}`);
      }
      if (error.msg.non_field_errors) {
        this.setState((state) => {
          return { ...state, message: error.msg.non_field_errors.join(), variant: 'danger' };
        });
        //  alert.error(error.msg.non_field_errors.join());
      }
      if (error.msg.username) {
        this.setState((state) => {
          return { ...state, message: error.msg.username.join(), variant: 'danger' };
        });
        //  alert.error(error.msg.username.join());
      }
    }

    if (message !== prevProps.message) {
      if (message.deleteLead) {
        this.setState((state) => {
          return { ...state, message: message.deleteLead, variant: 'success' };
        });
        //  alert.success(message.deleteLead);
      }
      if (message.addLead) {
        this.setState((state) => {
          return { ...state, message: message.addLead, variant: 'success' };
        });
        //  alert.success(message.addLead);
      }
      if (message.passwordNotMatch) {
        this.setState((state) => {
          return { ...state, message: message.passwordNotMatch, variant: 'danger' };
        });
        //  alert.error(message.passwordNotMatch);
      }
    }
  }

  onClose = (visibilityBool) => () =>
    this.setState((state) => {
      return { ...state, visibility: visibilityBool };
    });

  render() {
    const { visibility, variant, message } = this.state;
    if (visibility) {
      return (
        <Alert variant={variant} onClose={this.onClose(false)} dismissible>
          {message}
        </Alert>
      );
    }
    return <Fragment />;
  }
}

Alerts.propTypes = {
  error: PropTypes.shape({
    msg: PropTypes.object,
    status: PropTypes.number,
  }).isRequired,
  message: PropTypes.objectOf(PropTypes.string).isRequired,
};

// const mapStateToProps = (state) => ({
//   error: state.errors,
//   message: state.messages,
// });

//  export default connect(mapStateToProps)(withAlert()(Alerts));
