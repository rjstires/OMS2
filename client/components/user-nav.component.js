import React from 'react';
import {Link} from 'react-router';
import crypto from 'crypto';

function gravatarHash(emailAddress) {
  return crypto.createHash('md5').update(emailAddress).digest('hex');
}

const UserNav = (props) => {

  let actions;
  if (!props.user.emailAddress) {
    actions = (
      <li><Link to="/login">Login</Link></li>
    );
  } else {
    actions = (
      <li className="dropdown profile_menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><img
          alt="Avatar"
          src={`https://www.gravatar.com/avatar/${gravatarHash(props.user.emailAddress)}?s=30`}/><span className="username">{props.user.firstName} {props.user.lastName}</span>
          <b className="caret"></b></a>
        <ul className="dropdown-menu">
          <li><a href="#">My Account</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Messages</a></li>
          <li className="divider"></li>
          <li><a href="#" onClick={props.logout}>Logout</a></li>
        </ul>
      </li>
    );
  }

  return (
    <ul className="nav navbar-nav navbar-right user-nav">
      {actions}
    </ul>
  );
};

UserNav.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

export default UserNav;