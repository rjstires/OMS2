import React, {PropTypes, Component} from 'react';
import {reduxForm} from 'redux-form';
import Input from '../form/input.component';

const fields = ['title'];

class NewGameContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.submit = this.submit.bind(this);
  }

  submit({title}) {
    this.props.createGame({title});
  }

  render() {
    const {
      fields: {title}, handleSubmit, resetForm } = this.props;

    return (
      <div className="block-flat">
        <div className="header"><h2>New Game</h2></div>
        <div className="content">
          <form action="" onSubmit={handleSubmit(this.submit)} novalidate>
            <Input formObject={title} name="gameTitle" placeholder="Title" label="Title"/>
            <button className="btn btn-primary pull-right" type="submit">Submit</button>
            <button className="btn btn-default pull-right" onClick={resetForm}>Clear</button>
            <div className="clearfix"></div>
          </form>
        </div>
      </div>
    );
  }
}
const validate = (values) => {
  const errors = [];

  if(!values.title){
    errors.title = 'Title cannot be blank.';
  }

  return errors;
};


NewGameContainer.propTypes = {
  createGame: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'createGame',
  fields,
  validate
})(NewGameContainer);
