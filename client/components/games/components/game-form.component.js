import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {SubmissionError, Field, reduxForm} from 'redux-form';
import Input from '../../form/input.component.js';

const fields = ['title'];
const formName = 'newGameForm';

let GameForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="title">Game Title</label>
        <Field name="title" component={Input}/>
        <button className="btn btn-primary pull-right" type="submit">Submit</button>
        <div className="clearfix"></div>
      </form>
    );
}

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'The title is required.';
  }

  return {};
};

GameForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

GameForm = reduxForm({
    form: formName,
    fields,
    validate
  }
)(GameForm);

GameForm = connect(
  state => ({initialValues: state.games.currentGame}),
  {}
)(GameForm);

export default GameForm;
