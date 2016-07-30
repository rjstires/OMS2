import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
class Input extends Component {
  static propTypes() {
    return {
      formObject: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      label: PropTypes.string,
      type: PropTypes.string,
      width: PropTypes.string,
      icon: PropTypes.string
    };
  }

  constructor(props, context) {
    super(props, context);

    this.displayIcon = this.displayIcon.bind(this);
  }

  displayIcon() {
    if (this.props.icon) {
      const iconClasses = classNames({fa: true, 'fa-user': true});
      return (
        <span className="input-group-addon">
        <i className={iconClasses}></i>
      </span>
      );
    }
  }

  render() {
    const type = this.props.type || 'text';
    const formObject = this.props.formObject;
    const name = this.props.name;
    const placeholder = this.props.placeholder;
    const label = this.props.label;
    const icon = this.props.icon;

    const surroundClass = classNames({
      'input-group': (icon),
      'form-group': !icon
    });

    const inputClasses = classNames({
      'form-control': true
    });

    return (
      <div>
        <div className={surroundClass}>
          {label && <label htmlFor={name}>{label}</label>}
          {this.displayIcon()}
          <input name={name}
                 id={name}
                 ref={name}
                 type={type}
                 className={inputClasses}
                 placeholder={placeholder}
            {...formObject}/>

        </div>
        {formObject.touched && formObject.error &&
        <div className="form-error">{formObject.error}</div>}
      </div>
    );
  }
}

export default Input;