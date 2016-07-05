import React, {PropTypes, Component} from 'react';
import {reduxForm} from 'redux-form';
import LoadingComponent from './loading.component';
import Input from './form/input.component';

export const fields = ['firstName', 'lastName', 'emailAddress', 'password', 'passwordConfirm'];

class RegisterForm extends Component {
  handleFormSubmit({firstName, lastName, emailAddress, password}) {
    this.props.register({firstName, lastName, emailAddress, password});
  }

  render() {
    const {
      fields:
        {
          firstName,
          lastName,
          emailAddress,
          password,
          passwordConfirm
        },
      handleSubmit
    } = this.props;

    if (this.props.registration.loading) {
      return (
        <LoadingComponent />
      );
    }

    return (
      <div className='col m4 offset-m4'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
              noValidate>
          <Input
            formObject={firstName}
            name='firstName'
            label='First Name' />

          <Input
            formObject={lastName}
            name='lastName'
            label='Last Name' />

          <Input
            formObject={emailAddress}
            name='emailAddress'
            label='Email Address' />

          <Input
            formObject={password}
            name='password'
            label='Password'
            type='password' />

          <Input
            formObject={passwordConfirm}
            name='passwordConfirm'
            label='Password Confirmation'
            type='password' />

          <div className='row div col m12'>
            <button className='btn waves-effect waves-light' type='submit'
                    name='action'>
              Submit
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Enter your first name.';
  }

  if (!values.lastName) {
    errors.lastName = 'Enter your last name.';
  }

  if (!values.emailAddress) {
    errors.emailAddress = 'Enter your email address.';
  } else if (!/\S+@\S+\.\S+/.test(values.emailAddress)) {
    errors.emailAddress = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Enter a password.';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,22}/.test(values.password)) {
    errors.password = 'Password must be between 8 and 22 characters, contain at least one uppercase characters, one special character ($@!%*?&), and one number.';
  } else if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Confirm your password';
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Woops! Your passwords do not match.';
  }


  return errors;
};


RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  registration: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'register',
  fields,
  validate
})(RegisterForm);
