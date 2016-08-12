import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

const Input = (props) => {

  const displayIcon = () => {
    if (props.icon) {
      const iconClasses = classNames({fa: true, 'fa-user': true});
      return (
        <span className="input-group-addon">
        <i className={iconClasses}></i>
      </span>
      );
    }
  };

  const icon = props.icon;

  const surroundClass = classNames({
    'input-group': icon,
    'form-group': !icon
  });

  return (
    <div>
      <div className={surroundClass}>
        {props.label && <label htmlFor={props.name}>{props.label}</label>}
        {displayIcon()}
        <input className="form-control" {...props.input} />
      </div>
      {props.touched && props.error &&
      <div className="form-error">{props.error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  icon: PropTypes.string,
  touched: PropTypes.bool,
  input: PropTypes.object
};

export default Input;