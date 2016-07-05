import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import BannerNote from '../components/banner-note.component';

export const BannerNoteContainer = (props) => {
  return (
    <BannerNote bannerNote={props.bannerNote} />
  );
};

BannerNoteContainer.propTypes = {
  bannerNote: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    bannerNote: state.bannerNote
  };
}

export default connect(mapStateToProps)(BannerNoteContainer);