import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../modules/games.duck';
import GameRow from '../components/games/game-row.component.js';
import NewGameForm from '../components/games/new-game-form.component';
import LoadingComponent from '../components/loading.component';
import AlertComponent from '../components/alert.component.js';

class GamesPageContainer extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.loadGames();
    console.log(props.games.titles);
  }

  createGame(game) {
    console.log('Submitting:', game);
  }

  render() {
    const titles = this.props.games.titles;

    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3">
          <div className="block-flat">
            <div className="header">
              <h2>Games</h2>
            </div>
            <div className="content">
              {this.props.games.loading &&
                <div>
                  <div className="clearfix"></div>
                  <LoadingComponent />
                  <div className="clearfix"></div>
                </div>
              }
              {this.props.games.error &&
                <AlertComponent type="error" message={this.props.games.error} dismissable={false} />
              }
              {!this.props.games.loading && !this.props.games.error &&   <div className="table-responsive">
                <div className="pull-left">Left</div>
                <div className="pull-right">Right</div>
                <div className="clearfix"></div>
                <table id="product-table" className="form-inline">
                  <thead>
                  <tr role="row">
                    <th className="sorting" role="columnheader">ID</th>
                    <th className="sorting" role="columnheader">Title</th>
                    <th className="sorting" role="columnheader">Products</th>
                    {/*<th className="sorting" role="columnheader"></th>*/}
                  </tr>
                  </thead>
                  <tbody>
                  { titles.length > 0 && titles.map((game, index) => <GameRow game={game} key={index}/>) }
                  </tbody>
                </table>
              </div>}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <NewGameForm createGame={this.createGame}/>
        </div>
      </div>
    );
  }
}

GamesPageContainer.propTypes = {
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
)(GamesPageContainer);

