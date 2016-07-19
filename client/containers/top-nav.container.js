import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../modules/registration.duck';
import UserNav from '../components/user-nav.component';

export const TopNavContainer = (props) => {
  return (
    <div id="head-nav" className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-collapse">
          <UserNav
            user={props.user}
            login={props.actions.login}
            logout={props.actions.logout}
          />
          {/*<NavNotifcations />*/}
        </div>
      </div>
    </div>
  );
};


TopNavContainer.propTypes = {
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
)(TopNavContainer);
