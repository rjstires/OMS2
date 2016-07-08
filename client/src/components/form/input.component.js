import React, {PropTypes, Component} from "react";

class Input extends Component {
  static propTypes() {
    return {
      formObject: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      width: PropTypes.string,
      icon: PropTypes.string
    };
  }

  constructor(props, context){
    super(props, context);

    this.displayIcon = this.displayIcon.bind(this);
  }

  displayIcon(){
    if(this.props.icon){
      return(
        <i className="material-icons prefix">{this.props.icon}</i>
      );
    }
  }

  render() {
    const type = this.props.type || "text";
    const formObject = this.props.formObject;
    const name = this.props.name;
    const label = this.props.label;

    return (
      <div className="input-field">
        {this.displayIcon()}
        <input name={name}
               id={name}
               ref={name}
               type={type}
          {...formObject}/>
        <label htmlFor={name} className="center-align">{label}</label>
        {formObject.touched && formObject.error &&
        <div className="form-error">{formObject.error}</div>}
      </div>
    );
  }
}

export default Input;