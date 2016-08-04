import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../modules/registration.duck.js';

class ConfirmEmailContainer extends Component {
  constructor(props, context) {
    super(props, context);

    const token = props.location.query.confirmAccount;
    const confirmed = props.confirmed;

    if(token && !confirmed){
      props.actions.confirmEmail(token);
    }
  }

  render() {
    return (
      <div>
        <h1>Email Confirmation</h1>
      </div>
    );
  }
}
ConfirmEmailContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  confirmed: PropTypes.bool
};

function mapStateToProps (state) {
  return {
    confirmed: state.registration.user.emailConfirmed,
    loading: state.registration.loading
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
)(ConfirmEmailContainer);

