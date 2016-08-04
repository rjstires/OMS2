import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../../modules/games.duck';
import GameRow from './components/game-row.component';
import LoadingComponent from '../loading.component';
import AlertComponent from '../alert.component';
import ButtonComponent from '../common/button.component';
import NewGameForm from './components/new-game-form.component';

class ListGamesContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.deleteGame = this.deleteGame.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.toggleNewGameForm = this.toggleNewGameForm.bind(this);
    this.setCurrentGame = this.setCurrentGame.bind(this);
  }

  componentWillMount() {

    this.state = {
      showForm: false,
      loading: true
    };

    this.props.actions.loadGames()
      .then(() => this.setState({loading: false}))
      .catch(() => this.setState({loading: false}));
  }

  deleteGame(id) {
    this.props.actions.deleteGame(id);
  }

  handleSubmit(game) {
    this.setState({loading: true});

    if (this.props.games.currentGame) {
      this.props.actions.updateGame(this.props.games.currentGame.id, game).then(function() {
        this.props.actions.clearCurrentGame();
        this.setState({showForm: false});
        this.setState({loading: false});
      }.bind(this));

      return;
    }

    this.props.actions.createGame(game);
    this.setState({showForm: false});
    this.setState({loading: false});
  }

  resetForm(){
    this.setState({showForm: false});
    this.props.actions.clearCurrentGame();
  }

  toggleNewGameForm() {
    if(this.state.showForm){
      this.props.actions.clearCurrentGame();
    }

    this.setState({showForm: !this.state.showForm});
  }

  setCurrentGame(game) {
    this.props.actions.setCurrentGame(game);
    this.setState({showForm: true});
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
                        setCurrentGame={self.setCurrentGame} />);
      });
    }

    if(loading){
      return <LoadingComponent />
    }

    return (
      <div className="row">
        {this.state.showForm &&
        <div className="block-flat col-md-offset-3 col-md-6">
          <div className="header"><h2>New Game</h2></div>
          <div className="content">
            <NewGameForm createGame={this.handleSubmit} handleReset={this.resetForm} />
          </div>
        </div>
        }
        <div className="block-flat col-md-offset-3  col-md-6">
          <div className="header">
            <h2>Games</h2>
          </div>
          <div className="content">

            {errors && <AlertComponent type="error" message={errors} dismissable={false}/>}

            {!loading && !errors && <div className="table">
              <div className="pull-left"></div>
              <div className="pull-right">
                <button className="btn btn-primary btn-sm" onClick={this.toggleNewGameForm}>
                  <i className="fa fa-plus-square"></i>&nbsp;
                  {!this.state.showForm && 'New Game'}
                  {this.state.showForm && 'Hide Form'}
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