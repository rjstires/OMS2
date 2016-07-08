import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "../modules/registration.duck";
import NavBar from "../components/nav-bar.component";

export const NavBarContainer = (props) => {
  return (
    <NavBar
      user={props.user}
      login={props.actions.login}
      logout={props.actions.logout}
    />
  );
};

NavBarContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.registration.user
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
