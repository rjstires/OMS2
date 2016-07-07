import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

class Input extends Component {

  static propTypes() {
    return {
      formObject: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      width: PropTypes.string
    };
  }
  getColWidth() {
    const columnWidth = this.props.width || 'large';
    switch (columnWidth) {
      case('half'): return 's6 m6 l6';
      case('third'): return 's4 m4 l4';
      case('quarter'): return 's3 m3 l3';
      default: return 's12 m12 l12';
    }
  }

  render() {
    const type = this.props.type || 'text';
    const formObject = this.props.formObject;
    const name = this.props.name;
    const label = this.props.label;
    const placeholder = this.props.placeholder;
    const inputClassName = classNames({
      invalid: (formObject.touched && formObject.error)
    });

    const columnClass = 'col input-field ' + this.getColWidth();

    return (
      <div className={columnClass}>
        <label htmlFor={name}>{label}</label>
        <input name={name}
               ref={name}
               type={type}
               className={inputClassName}
          {...formObject}/>
        {formObject.touched && formObject.error &&
        <div className='form-error'>{formObject.error}</div>}
      </div>
    );
  }
}

export default Input;