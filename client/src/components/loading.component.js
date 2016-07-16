import React from 'react';

const LoadingComponent = () => {
  return(
    <div className="col m4 offset-m4">
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;