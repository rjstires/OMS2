import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class NavBarContainer extends React.Component {
  static propTypes() {
    return {
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      user: PropTypes.object
    };
  }

  constructor(props, context) {
    super(props, context);
  }

  loginLink() {
    if (!this.props.user.emailAddress) {
      return (
        <li><Link to="/login">Login</Link></li>
      );
    }
  }

  logoutLink() {
    if (this.props.user.emailAddress) {
      return (
        <li><a href="#" onClick={this.props.logout}>Logout</a></li>
      );
    }
  }

  registerLink() {
    if (!this.props.user.emailAddress) {
      return (
        <li><Link to="/register">Register</Link></li>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.loginLink()}
            {this.registerLink()}
            {this.logoutLink()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBarContainer;
