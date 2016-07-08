import React, {PropTypes, Component} from "react";
import {reduxForm} from "redux-form";
import LoadingComponent from "./loading.component";
import Input from "./form/input.component";
import {Link} from "react-router";

export const fields = ["emailAddress", "password"];

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
      <div className="col m3 offset-m5 z-depth-1 login-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
              noValidate>

          <div className="section">
            <h5>Login</h5>
            <p>Enter your credentials to login</p>
          </div>
          <div className="divider"></div>

          <div className="row shallow">
            <div className="col s12 m12 l12">
              <Input
                formObject={emailAddress}
                name="emailAddress"
                label="Email Address"
                type="email"
                icon="email"
              />
            </div>
          </div>

          <div className="row shallow">
            <div className="col s12 m12 l12">
              <Input
                formObject={password}
                name="password"
                label="Password"
                type="password"
                icon="lock_outline"
              />
            </div>
          </div>


          <div className="row">
            <div className=" col s12 m12 l12 input-field">
              <input type="checkbox" id="rememberMe" name="rememberMe"/>
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <button
                className="btn waves-effect waves-light col s12"
                type="submit"
                name="action">
                Submit
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col s6 m6 l6"><Link to="/register">Register!</Link></div>
            <div className="col s6 m6 l6"><Link to="/forgot-password">Forgot password?</Link></div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.emailAddress) {
    errors.emailAddress = "Enter an email address to continue.";
  }

  if (!values.password) {
    errors.password = "Enter a password to continue.";
  }
  return errors;
};

export default reduxForm({
  form: "login",
  fields,
  validate
})(LoginForm);
