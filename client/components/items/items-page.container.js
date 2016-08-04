import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../../modules/registration.duck.js';
import ItemRow from './item-row.component.js';

class ItemsPageContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const items = [
      {id: 0, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 1, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 2, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 3, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 4, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 5, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 6, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 7, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 8, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 9, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 10, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 11, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 12, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
      {id: 13, game: 'World of Warcraft', title: 'Raiding', numVariants: 22},
    ];

    return (
      <div className="col-md-12">
        <div className="block-flat">
          <div className="header">
            <h1>Items</h1>
          </div>
          <div className="content">
            <div className="table-responsive">
              <div className="pull-left">Left</div>
              <div className="pull-right">
                <button type="button" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i> New Product</button>
              </div>
              <div className="clearfix"></div>
              <table id="product-table" className="form-inline">
                <thead>
                <tr role="row">
                  <th className="sorting" role="columnheader">ID</th>
                  <th className="sorting" role="columnheader">Game</th>
                  <th className="sorting" role="columnheader">Title</th>
                  <th className="sorting" role="columnheader">Variants</th>
                  {/*<th className="sorting" role="columnheader"></th>*/}
                </tr>
                </thead>
                <tbody>
                { items.length > 0 && items.map((item, index) => <ItemRow item={item} key={index} />) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ItemsPageContainer.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsPageContainer);

