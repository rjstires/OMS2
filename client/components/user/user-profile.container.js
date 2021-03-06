import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../modules/registration.duck.js';

class UserProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);

    const token = props.location.query.confirmAccount;
    const user = props.user;

    if (token) {
      props.actions.confirmEmail(token);
    }

    this.state = Object.assign({}, this.state, {
      loading: false
    });
  }

  render() {
    return (
      <div>
        <h1>User Profile</h1>
      </div>
    );
  }
}

UserProfileContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.registration.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);

