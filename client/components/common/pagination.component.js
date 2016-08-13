import React from 'react';
import _ from 'lodash';
import Classnames from 'classnames';

/*
 page
 pageSize
 rowCount
 pageCount
 */
const Pagination = (props) => {
  const page = props.page;
  const pageSize = props.pageSize;
  const rowCount = props.rowCount;
  const pageCount = props.pageCount;
  const rowElements = [];
  const goToPreviousPage = () => props.goToPage(page - 1);
  const goToNextPage = () => props.goToPage(page + 1);
  const showPreviousPage = (page - 1 < 0);
  const showNextPage = (page + 1 <= pageCount);

  for (let i = 1; i <= pageCount; i++) {
    // TODO Extract to own dumb component.

    let isCurrentPage = (i === page);

    const goToPage = () => props.goToPage(i);

    rowElements.push(
      <li className={Classnames({active: isCurrentPage})}>
        <a key={i} onClick={!isCurrentPage && goToPage}>{i}</a>
      </li>
    );
  }

  return (
    <div>
      <ul className="pagination">
        <li className={Classnames({disabled: !showPreviousPage})}><a onClick={showPreviousPage && goToPreviousPage}>«</a></li>
        {rowElements}
        <li className={Classnames({disabled: !showNextPage})}><a onClick={showNextPage && goToPreviousPage}>»</a></li>
      </ul>
    </div>
  );
};

export default Pagination;