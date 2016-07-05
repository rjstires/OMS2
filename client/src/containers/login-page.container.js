import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../modules/authentication.duck';
import LoginForm from '../components/login-form.component';

export const LoginPage = (props) => {
  return (
    <div className='row'>
      <div className='col m12'>
        <LoginForm
          login={props.actions.login}
          authenticated={props.authenticated}
        />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  authenticated: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated
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
