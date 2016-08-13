import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../modules/games.duck';
import GameRow from './components/game-row.component';
import LoadingComponent from '../loading.component';
import AlertComponent from '../alert.component';
import Portlet from '../common/portlet.component.js';
import GameForm from './components/game-form.component';
import TransitionGroup from 'react-addons-css-transition-group';
import {SubmissionError} from 'redux-form';
import Promise from 'bluebird';
import _ from 'lodash';

class ListGamesContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.createGame = this.createGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.deleteGame = this.deleteGame.bind(this);

    this.displayList = this.displayList.bind(this);
    this.closeList = this.closeList.bind(this);

    this.displayEditGameForm = this.displayEditGameForm.bind(this);
    this.closeEditGameForm = this.closeEditGameForm.bind(this);

    this.displayNewGameForm = this.displayNewGameForm.bind(this);
    this.closeNewGameForm = this.closeNewGameForm.bind(this);
  }

  componentWillMount() {
    this.state = {
      newGame: false,
      editGame: false,
      list: true,
      loading: true
    };

    this.props.actions.loadGames()
      .then(() => this.setState({loading: false}))
      .catch(() => this.setState({loading: false}));
  }

  deleteGame(id) {
    this.props.actions.deleteGame(id);
  }

  createGame(game) {
    return new Promise((resolve, reject) => {
      this.props.actions.createGame(game)
        .then((res) => {
          this.props.actions.createGameSuccess(res.data);
          this.closeNewGameForm();
          resolve(res);
        })
        .catch((err) => {
          const errors = err.data.error;
          _.each(errors, function(value, key) {
            reject(new SubmissionError({[key]: [value], _error: 'Game creation failed.'}));
          });

        });
    });

  }

  updateGame(game) {
    const id = game.id;
    return new Promise((resolve, reject) => {
      this.props.actions.updateGame(id, game)
        .then((res) => {
          this.closeEditGameForm();
          this.props.actions.updateGameSuccess(res.data);
        })
        .catch(reject); // TODO Rejections...
    });

  }

  displayNewGameForm() {
    this.setState({newGame: true});
    this.closeList();
  }

  closeNewGameForm() {
    this.setState({newGame: false});
    this.displayList();
  }

  displayEditGameForm(game) {
    this.props.actions.setCurrentGame(game);
    this.setState({editGame: true});
    this.closeList();
  }

  closeEditGameForm() {
    this.props.actions.clearCurrentGame();
    this.setState({editGame: false});
    this.displayList();
  }

  displayList() {
    this.setState({list: true});
  }

  closeList() {
    this.setState({list: false});
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
        <div className="col-md-offset-3  col-md-6">
          <TransitionGroup transitionName="fade" transitionEnterTimeout={250} transitionLeave={false}>

          {this.state.newGame &&
            <Portlet title="Create a Game" closeWindow={this.closeNewGameForm}>
              <GameForm onSubmit={this.createGame}/>
            </Portlet>
            }

            {this.state.editGame &&
            <Portlet title="Edit Game" closeWindow={this.closeEditGameForm}>
              <GameForm onSubmit={this.updateGame}/>
            </Portlet>
            }

            {this.state.list &&
              <Portlet title="Games">
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
              </Portlet>
            }
          </TransitionGroup>
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