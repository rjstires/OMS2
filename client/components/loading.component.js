import React from 'react';

const LoadingComponent = () => {
  const style={width: '100%'};
  return(
    <div className="progress progress-striped active">
      <div className="progress-bar progress-bar-info" style={style}>Loading...</div>
    </div>
  );
};

export default LoadingComponent;