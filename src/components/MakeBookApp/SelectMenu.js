import React from 'react';
import './MakeBook.scss';

const SelectMenu = ({ makeMenu, selectedMenu, deleteSelectMenu }) => {
  return (
    <>
      <div className="select-menu">{makeMenu()}</div>
      <div className="selected-menu">
        <div className="curSelectMenu">
          {selectedMenu.map(e => {
            return (
              <div
                role="button"
                onClick={deleteSelectMenu}
                onKeyDown=""
                tabIndex={0}
                className="selected"
              >
                {e}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <text className="explain">누르면 제거됩니다.</text>
      </div>
    </>
  );
};

export default SelectMenu;
