import React, {PropTypes, Component} from 'react';
import {reduxForm, reset} from 'redux-form';
import Input from '../../form/input.component.js';

const fields = ['title'];
const formName = 'newGameForm';

class GameForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.props.resetForm();
    this.props.handleReset();
  }

  render() {
    const {fields: {title}, handleSubmit} = this.props;

    return (
      <form action="" onSubmit={handleSubmit(this.props.submit)} novalidate>
        <Input formObject={title} name="gameTitle" placeholder="Title" label="Title"/>
        <button className="btn btn-primary pull-right" type="submit">Submit</button>
        <button className="btn btn-default pull-right" onClick={this.reset} type="button">Cancel
        </button>
        <div className="clearfix"></div>
      </form>
    );
  }
}
const validate = (values) => {
  const errors = [];

  if (!values.title) {
    errors.title = 'The title is required.';
  }

  return errors;
};


GameForm.propTypes = {
  submit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
};

export default reduxForm(
  {
    form: formName,
    fields,
    validate
  },
  state => ({
    initialValues: state.games.currentGame
  })
)(GameForm);
