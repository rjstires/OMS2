// Libraries
import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';
import {SubmissionError, initialize, reset} from 'redux-form';
import Promise from 'bluebird';
import _ from 'lodash';

// Ducks
import {actions} from '../../modules/games.duck';

// Components
import GameRow from './components/game-row.component';
import LoadingComponent from '../loading.component';
import AlertComponent from '../alert.component';
import Portlet from '../common/portlet.component.js';
import GameForm from './components/game-form.component';
import Pagination from '../common/pagination.component';

class ListGamesContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.createGame = this.createGame.bind(this);
    this.editGame = this.editGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  componentWillMount() {
    this.state = {
      newGame: true,
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

  createGame(game) {
    return new Promise((resolve, reject) => {
      this.props.actions.createGame(game)
        .then((res) => {
          this.props.actions.createGameSuccess(res.data);
          this.props.actions.loadGames();
        })
        .catch((err) => {
          const errors = err.data.error;
          _.each(errors, function(value, key) {
            reject(new SubmissionError({[key]: [value], _error: 'Game creation failed.'}));
          });

        });
    });

  }

  editGame(game) {
    this.props.actions.setCurrentGame(game);
    this.props.dispatch(initialize('gameForm', game));
  }

  updateGame(game) {
    const id = game.id;
    return new Promise((resolve, reject) => {
      this.props.actions.updateGame(id, game)
        .then((res) => {
          this.props.actions.updateGameSuccess(res.data);
          resolve();
        })
        .catch(reject); // TODO Rejections...
    });

  }

  goToPage(pageNum){
    this.props.actions.loadGames(pageNum);
  }

  render() {
    const self = this;
    const loading = self.state.loading;
    const {titles, errors, pagination, currentGame} = self.props.games;
    const handleForm = (currentGame) ? self.updateGame : self.createGame;
    const formTitle = (currentGame) ? 'Update Game' : 'Create Game';

    let gamesList = [];

    if (titles && titles.length > 0) {
      gamesList = titles.map(function(game, index) {
        return (<GameRow game={game}
                         key={index}
                         deleteGame={self.deleteGame}
                         editGame={self.editGame}/>);
      });
    }

    if (loading) {
      return <LoadingComponent />;
    }


    return (
      <div className="row">
        <div className="col-md-6">
          <Portlet title="Games">
            {errors && <AlertComponent type="error" message={errors} dismissable={false}/>}

            {!loading && !errors &&
            <div className="table">
              {/*<div className="pull-left"></div>
              <div className="pull-right"></div>*/}
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
              <Pagination
                page={pagination.page}
                pageSize={pagination.pageSize}
                rowCount={pagination.rowCount}
                pageCount={pagination.pageCount}
                goToPage={this.goToPage}
              />
            </div>}
          </Portlet>
        </div>
        <div className="col-md-6">
          <TransitionGroup transitionName="fade" transitionEnterTimeout={250} transitionLeave={false}>
            <Portlet title={formTitle} closeWindow={this.closeNewGameForm}>
              <GameForm onSubmit={handleForm}/>
            </Portlet>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

ListGamesContainer.propTypes = {
  games: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGamesContainer);