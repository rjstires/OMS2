import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../modules/games.duck.js';
import NewGameForm from './components/new-game-form.component.js';


class NewGameContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.createGame = this.createGame.bind(this);
  }

  createGame(game) {
    this.props.actions.createGame(game);
  }


  render() {
    return (
        <NewGameForm createGame={this.createGame}/>
    );
  }
}

NewGameContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGameContainer);

