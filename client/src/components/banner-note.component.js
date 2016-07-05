import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

class BannerNote extends Component {
  displayBannerNote() {
    const className = classNames({
      'col': true,
      's12 m12 l12': true,
      'valign-wrapper': true,
      'banner-note': true,
      [`${this.props.bannerNote.style}`]: true
    });

    if (this.props.bannerNote.message) {
      return (
          <div className={className}>
            <div className='valign'>{this.props.bannerNote.message}</div>
          </div>
      );
    } else {
      return (<div></div>);
    }
  }

  render() {
    return (
      this.displayBannerNote()
    );
  }
}

BannerNote.propTypes = {
  bannerNote: PropTypes.object.isRequired
};

export default BannerNote;