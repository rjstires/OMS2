import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../modules/games.duck.js';
import GameRow from './components/game-row.component.js';
import NewGameForm from './components/new-game-form.component.js';
import LoadingComponent from '../loading.component.js';
import AlertComponent from '../alert.component.js';

class GamesPage extends Component {
  constructor(props, context) {
    super(props, context);

    // Load games


    this.createGame = this.createGame.bind(this);
  }

  createGame(game) {
    this.props.actions.createGame(game);
  }

  render() {
    return (
      <div className="col-md-12">
        {this.props.children}
      </div>
    );
  }
}

GamesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  games: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    games: state.games
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
)(GamesPage);

