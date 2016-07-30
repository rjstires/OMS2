import React, {PropTypes} from 'react';

const GameRow = (props) => {
  const game = props.game;
  return(
    <tr>
      <td>{game.id}</td>
      <td>{game.title}</td>
      <td><a href="#">{game.numProducts}</a></td>
    </tr>
  );
};

GameRow.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameRow;