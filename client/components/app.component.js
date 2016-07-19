import React, {PropTypes} from 'react';
//import TopNavContainer from '../containers/nav-bar.container'; // eslint-disable-line import/no-named-as-default
import TopNav from '../containers/top-nav.container';
import SideNav from './side-nav.component';
const App = (props) => {
  return (
    <div id="cl-wrapper">
      <div id="cl-wrapper">

        <SideNav />

        <div className="container-fluid" id="pcont">

          <TopNav />

          <div className="cl-mcont">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
App.propTypes = {
  children: PropTypes.element
};

export default App;


