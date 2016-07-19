import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../modules/registration.duck';
import RegisterForm from '../components/register-form.component';

export const LoginPage = (props) => {

  return (
    <div className="row">
      <div className="col m12">
        <RegisterForm
          registration={props.registration}
          register={props.actions.registerUser}
        />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  registration: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    registration: state.registration
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
