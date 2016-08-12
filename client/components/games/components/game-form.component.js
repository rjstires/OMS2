import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {SubmissionError, Field, reduxForm} from 'redux-form';
import Input from '../../form/input.component.js';

const fields = ['title'];
const formName = 'newGameForm';

class GameForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.submit)}>
        <label htmlFor="title">Game Title</label>
        <Field name="title" component={Input}/>
        <button className="btn btn-primary pull-right" type="submit">Submit</button>
        <button className="btn btn-default pull-right" type="button">Cancel
        </button>
        <div className="clearfix"></div>
      </form>
    );
  }
}
const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'The title is required.';
  }

  return errors;
};

GameForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

GameForm = reduxForm({
    form: formName,
    fields,
    validate
  }
)(GameForm);

GameForm = connect(
  state => ({ initialValues: state.games.currentGame}),
  {}
)(GameForm);

export default GameForm;
