import React, {PropTypes} from 'react';

const ItemRow = (props) => {
  const item = props.item;
  return(
    <tr>
      <td>{item.id}</td>
      <td><a href="#">{item.game}</a></td>
      <td><a href="#">{item.title}</a></td>
      <td><a href="#">{item.numVariants}</a></td>
    </tr>
  );
};

ItemRow.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemRow;