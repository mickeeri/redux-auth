import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Bye! Welcome back soon!</div>;
  }
}

Signout.propTypes = {
  signinUser: PropTypes.func.isRequired,
};

export default connect(null, actions)(Signout);
