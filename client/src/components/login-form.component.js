import React, {PropTypes, Component} from 'react';
import {reduxForm} from 'redux-form';
import LoadingComponent from './loading.component';
import Input from './form/input.component';

export const fields = ['emailAddress', 'password'];

class LoginForm extends Component {

  static propTypes() {
    return {
      login: PropTypes.func.isRequired,
      fields: PropTypes.object.isRequired,
      authenticated: PropTypes.object.isRequired,
      handleSubmit: PropTypes.func.isRequired
    };
  }

  handleFormSubmit({emailAddress, password}) {
    this.props.login({emailAddress, password});
  }

  render() {
    const {fields: {emailAddress, password}, handleSubmit} = this.props;
    if (this.props.authenticated.loading) {
      return (
        <LoadingComponent />
      );
    }

    return (
      <div className='col m4 offset-m4'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
              noValidate>

          <Input
            formObject={emailAddress}
            name='emailAddress'
            label='Email Address'
            placeholder='Enter your email address.'
          />
          <Input
            formObject={password}
            name='password'
            label='Password'
            type='password'
            placeholder='Enter your password.'
          />


          <div className='row div col m12'>
            <button
              className='btn waves-effect waves-light'
              type='submit'
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

  if (!values.emailAddress) {
    errors.emailAddress = 'Enter an email address to continue.';
  }

  if (!values.password) {
    errors.password = 'Enter a password to continue.';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  fields,
  validate
})(LoginForm);
