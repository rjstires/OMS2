import React, {PropTypes} from 'react';

const AlertComponent = (props) => {
  if (props.type === 'error') {
    return (
      <div className="alert alert-danger">
        {!props.dismissable &&
        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
        }
        <i className="fa fa-times-circle sign"></i><strong>Oh no!</strong>
        &nbsp;
        {props.message}
      </div>
    );
  }
};

AlertComponent.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dismissable: PropTypes.bool
};

export default AlertComponent