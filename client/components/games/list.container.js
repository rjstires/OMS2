import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../modules/games.duck';
import GameRow from './components/game-row.component';
import LoadingComponent from '../loading.component';
import AlertComponent from '../alert.component';
import Portlet from '../games/portlet.component';
import GameForm from './components/game-form.component';
import TransitionGroup from 'react-addons-css-transition-group';


class ListGamesContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.createGame = this.createGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.deleteGame = this.deleteGame.bind(this);

    this.displayEditGameForm = this.displayEditGameForm.bind(this);
    this.closeEditGameForm = this.closeEditGameForm.bind(this);

    this.displayNewGameForm = this.displayNewGameForm.bind(this);
    this.closeNewGameForm = this.closeNewGameForm.bind(this);
  }

  componentWillMount() {
    this.state = {
      newGame: false,
      editGame: false,
      loading: true
    };

    this.props.actions.loadGames()
      .then(() => this.setState({loading: false}))
      .catch(() => this.setState({loading: false}));
  }

  deleteGame(id) {
    this.props.actions.deleteGame(id);
  }

  createGame() {
    // TODO
    console.log('clicked');
  }

  updateGame() {
    // TODO
    console.log('clicked');
  }

  displayNewGameForm() {
    this.closeEditGameForm();
    this.setState({newGame: true});
  }

  closeNewGameForm() {
    this.setState({newGame: false});
  }

  displayEditGameForm(game) {
    this.closeNewGameForm();
    this.props.actions.setCurrentGame(game);
    this.setState({newGame: false, editGame: true});
  }

  closeEditGameForm() {
    this.props.actions.clearCurrentGame();
    this.setState({editGame: false});
  }

  render() {
    const self = this;
    const games = self.props.games.titles;
    const loading = self.state.loading;
    const errors = self.props.games.errors;

    let gamesList = [];
    if (games && games.length > 0) {
      gamesList = games.map(function(game, index) {
        return (<GameRow game={game}
                         key={index}
                         deleteGame={self.deleteGame}
                         editGame={self.displayEditGameForm}/>);
      });
    }

    if (loading) {
      return <LoadingComponent />;
    }

    return (
      <div className="row">
        <TransitionGroup transitionName="fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {this.state.newGame &&
          <Portlet title="Create a Game" closeWindow={this.closeNewGameForm}>
            <GameForm submit={this.createGame} />
          </Portlet>
          }
          {this.state.editGame &&
          <Portlet title="Edit Game" closeWindow={this.closeEditGameForm}>
            <GameForm submit={this.updateGame} />
          </Portlet>
          }
        </TransitionGroup>
        <div className="block-flat col-md-offset-3  col-md-6">
          <div className="header">
            <h2>Games</h2>
          </div>
          <div className="content">

            {errors && <AlertComponent type="error" message={errors} dismissable={false}/>}

            {!loading && !errors &&
            <div className="table">
              <div className="pull-left"></div>
              <div className="pull-right">
                <button className="btn btn-primary btn-sm" onClick={this.displayNewGameForm}>
                  <i className="fa fa-plus-square"></i> New Game
                </button>
              </div>
              <div className="clearfix"></div>
              <table id="product-table" className="form-inline">
                <thead>
                <tr role="row">
                  <th className="sorting" role="columnheader">ID</th>
                  <th className="sorting" role="columnheader">Title</th>
                  <th className="sorting" role="columnheader">Products</th>
                  <th className="sorting right" role="columnheader">Actions</th>
                </tr>
                </thead>
                <tbody>
                {gamesList}
                </tbody>
              </table>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

ListGamesContainer.propTypes = {
  games: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(ListGamesContainer);