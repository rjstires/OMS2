import React, {PropTypes, Component} from 'react';
import {reduxForm} from 'redux-form';
import LoadingComponent from '../../loading.component.js';
import Input from '../../form/input.component.js';
import {Link} from 'react-router';

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

  constructor(props, context) {
    super(props, context);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
      <div className="login-container">
        <div className="middle-login">
          <div className="block-flat">
            <div className="header">
              <h3 className="text-center"><img className="logo-img" src="lib/images/logo.png"
                                               alt="logo"/>
              </h3>
            </div>
            <div>
              <form onSubmit={handleSubmit(this.handleFormSubmit)} noValidate className="form-horizontal">
                <div className="content">
                  <h4 className="title">Login Access</h4>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <Input
                        formObject={emailAddress}
                        name="emailAddress"
                        placeholder="Email Address"
                        type="email"
                        icon="email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12">
                      <Input
                        formObject={password}
                        name="password"
                        placeholder="Password"
                        type="password"
                        icon="lock_outline"
                      />
                    </div>
                  </div>

                </div>
                <div className="foot">
                  <Link to="/register" className="btn waves-effect waves-light col s12">
                    Register </Link>
                  <button className="btn waves-effect waves-light col s12" type="submit"
                          name="action">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center out-links"><a href="#">&copy; 2014 Your Company</a>
          </div>
        </div>
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
