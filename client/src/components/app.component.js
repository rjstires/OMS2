import React, { PropTypes } from 'react';
import NavBarContainer from '../containers/nav-bar.container'; // eslint-disable-line import/no-named-as-default
import BannerNoteContainer from '../containers/banner-note.container'; // eslint-disable-line import/no-named-as-default

const App = (props) => {
  return (
    <div>
      <NavBarContainer />
      <br/>
      <div className='row col m12'>
        {props.children}
      </div>
      <BannerNoteContainer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
