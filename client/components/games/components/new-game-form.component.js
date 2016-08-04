import React, {PropTypes, Component} from 'react';
import {reduxForm} from 'redux-form';
import Input from '../../form/input.component.js';

const fields = ['title'];

class NewGameContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
  }

  submit({title}) {
    this.props.createGame({title});
    this.props.resetForm();
  }

  reset(){
    this.props.resetForm();
    this.props.handleReset();
  }

  render() {
    const {
      fields: {title}, handleSubmit
    } = this.props;

    return (
      <form action="" onSubmit={handleSubmit(this.submit)} novalidate>
        <Input formObject={title} name="gameTitle" placeholder="Title" label="Title"/>
        <button className="btn btn-primary pull-right" type="submit">Submit</button>
        <button className="btn btn-default pull-right" onClick={this.reset} type="button">Cancel</button>
        <div className="clearfix"></div>
      </form>
    );
  }
}
const validate = (values) => {
  const errors = [];

  if (!values.title) {
    errors.title = 'Title cannot be blank.';
  }

  return errors;
};


NewGameContainer.propTypes = {
  createGame: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
};

export default reduxForm(
  {
    form: 'createGame',
    fields,
    validate
  },
  state => ({
    initialValues: state.games.currentGame
  })
)(NewGameContainer);
