import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../modules/registration.duck';
import LoginForm from '../components/login-form.component';

export const LoginPage = (props) => {
  return (
    <div className="row">
      <div className="col m12">
        <LoginForm
          login={props.actions.login}
          user={props.user}
        />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
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
)(LoginPage);
