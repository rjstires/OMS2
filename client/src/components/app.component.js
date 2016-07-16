import React, {PropTypes} from 'react';
import NavBarContainer from '../containers/nav-bar.container'; // eslint-disable-line import/no-named-as-default

const App = (props) => {
  return (
    <div>
      <NavBarContainer />
      <div className="row col m12" id="mainContainer">
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
