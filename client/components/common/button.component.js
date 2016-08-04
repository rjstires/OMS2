import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

const ButtonComponent = (props) => {
  const sizes = ['xs', 'sm', 'lg'];
  const {style, icon, size, text, location} = props;

  if (size && !sizes.includes(size)) {
    throw new Error('Button size does not conform to expectations.');
  }

  const linkClasses = classNames({
    btn: true,
    [`btn-${style||'default'}`]: true,
    [`btn-${size}`]: size
  });

  const iconClasses = classNames({
    fa: true,
    [`fa-${icon}`]: icon
  });

  return(
    <Link to={location} className={linkClasses}>
      {icon && <i className={iconClasses}></i>}
      &nbsp;{text}
    </Link>
  );
};

ButtonComponent.propTypes = {
  location: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.string

};

export default ButtonComponent;