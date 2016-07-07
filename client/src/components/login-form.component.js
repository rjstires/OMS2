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
      user: PropTypes.object,
      loading: PropTypes.bool,
      handleSubmit: PropTypes.func.isRequired
    };
  }

  handleFormSubmit({emailAddress, password}) {
    this.props.login({emailAddress, password});
  }

  render() {
    const {fields: {emailAddress, password}, handleSubmit} = this.props;
    if (this.props.loading) {
      return (
        <LoadingComponent />
      );
    }

    return (
      <div className='col m4 offset-m4 z-depth-1'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
              noValidate>
          <div className='section'>
            <h5>Login</h5>
          </div>
          <div className='divider'></div>
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

          <div className='row div col m12 right-align'>
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
