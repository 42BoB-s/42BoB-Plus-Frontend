import React from 'react';

const MenuItem = props => {
  const { name, handleClickClose } = props;

  return (
    <div className="menu-item">
      <span>{name}</span>
      <img
        alt="cancel"
        src="/assets/cancel_icon.png"
        onClick={() => handleClickClose(name)}
      />
    </div>
  );
};

export default MenuItem;
