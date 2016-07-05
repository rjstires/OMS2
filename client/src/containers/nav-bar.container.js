import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../modules/authentication.duck';
import NavBar from '../components/nav-bar.component';

export const NavBarContainer = (props) => {
  return (
    <NavBar
      auth={props.authenticate}
      login={props.actions.login}
      logout={props.actions.logout}
    />
  );
};

NavBarContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  authenticate: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authenticate: state.authenticated
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
)(NavBarContainer);
