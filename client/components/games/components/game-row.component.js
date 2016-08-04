import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const GameRow = (props) => {
  const game = props.game;

  const deleteGame = () => {
    props.deleteGame(props.game.id);
  };

  const setCurrentGame = () => {
    props.setCurrentGame(props.game);
  };

  return (
    <tr>
      <td>{game.id}</td>
      <td>{game.title}</td>
      <td><a href="#">{game.numProducts}</a></td>
      <td className="right">
        <div className="btn-group">
          <button className="btn btn-default btn-xs" type="button">Actions</button>
          <button data-toggle="dropdown" className="btn btn-xs btn-primary dropdown-toggle"
                  type="button" aria-expanded="false"><span className="caret"></span><span
            className="sr-only">Toggle Dropdown</span></button>
          <ul role="menu" className="dropdown-menu">
            <li><a onClick={setCurrentGame}>Edit</a></li>
            <li className="divider"></li>
            <li><a onClick={deleteGame}>Remove</a></li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

GameRow.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired,
  setCurrentGame: PropTypes.func.isRequired
};

export default GameRow;