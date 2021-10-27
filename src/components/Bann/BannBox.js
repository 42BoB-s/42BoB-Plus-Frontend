import { React, memo } from 'react';
import SearchIcon from '@material-ui/icons/Search';

const BannBox = memo(
  ({ FindCadet, handleChangeInput, input, bannCadet, handleCancelBann }) => {
    return (
      <div className="bann">
        <div className="head">
          <SearchIcon />

          <form onSubmit={FindCadet}>
            <input
              onChange={handleChangeInput}
              type="text"
              maxLength="12"
              className="search-user"
              value={input}
            />
          </form>
        </div>
        <div className="body">
          {bannCadet.map(name => (
            <div className="banned">
              <text className="banned-id">{name}</text>
              <button
                type="button"
                className="banned-cancel"
                value={name}
                onClick={handleCancelBann}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default BannBox;
