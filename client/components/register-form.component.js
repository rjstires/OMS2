import React, {PropTypes, Component} from 'react';
import {reduxForm} from 'redux-form';
import LoadingComponent from './loading.component';
import Input from './form/input.component';

export const fields = ['firstName', 'lastName', 'emailAddress', 'password', 'passwordConfirm'];

class RegisterForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

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

    const formStyle = {
      marginBottom: '0px !important'
    };

    return (
      <div className="sign-up-container">
        <div className="middle-sign-up">
          <div className="block-flat">
            <div className="header">
              <h3 className="text-center"><img className="logo-img" src="lib/images/logo.png"
                                               alt="logo"/>
              </h3>
            </div>
            <div>
              <form style={formStyle}
                    className="form-horizontal"
                    onSubmit={handleSubmit(this.handleFormSubmit)}
                    parsley-validate novalidate>
                <div className="content">
                  <h5 className="title text-center"><strong>Sign Up</strong></h5>
                  <hr/>
                  <div className="form-group">
                    <div className="col-sm-6 col-xs-6">
                      <Input formObject={firstName}
                             name="firstName"
                             placeholder="First Name"
                             icon="user"/>

                    </div>
                    <div className="col-sm-6 col-xs-6">
                      <Input formObject={lastName}
                             name="lastName"
                             placeholder="Last Name"
                             icon="user"/>

                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-12">
                      <Input formObject={emailAddress}
                             name="emailAddress"
                             placeholder="Email Address"
                             icon="email"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-6 col-xs-6">
                      <Input formObject={password}
                             name="password"
                             placeholder="Password"
                             type="password" icon="lock"/>
                    </div>
                    <div className="col-sm-6 col-xs-6">
                      <Input formObject={passwordConfirm}
                             name="passwordConfirm"
                             placeholder="Password Confirmation"
                             type="password" icon="lock"/>
                    </div>
                  </div>
                  <p className="spacer">By creating an account, you agree with the <a
                    href="#">Terms</a> and <a href="#">Conditions</a>.</p>
                  <button className="btn btn-block btn-success btn-rad btn-lg" type="submit"
                          name="action"> Submit
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
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
