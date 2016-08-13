import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';

class PortletComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {opened: true};

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    this.setState({opened: !this.state.opened});
  }

  render() {
    const divStyles = {};

    const divClasses = Object.assign({}, {
      'block-flat': true,
      'closed': !this.state.opened
    });

    return (
        <div className={classnames(divClasses)} style={divStyles}>
          <div className="header">
            <div className="actions">
              <a className="minimize" onClick={this.toggleState}><i className="fa fa-chevron-down"></i></a>
              {this.props.refresh && <a className="refresh" href="#"><i className="fa fa-repeat"></i></a>}
              {this.props.closeWindow && <a className="close-down" onClick={this.props.closeWindow}><i className="fa fa-times"></i></a>}
            </div>
            <h3>{this.props.title}</h3>
          </div>
          <div className="content">
            {this.props.children}
          </div>
        </div>
    );
  }
}

PortletComponent.propTypes = {
  title: PropTypes.string.isRequired,
  closeWindow: PropTypes.func,
  refresh: PropTypes.func,
  classes: PropTypes.object
};
export default PortletComponent;