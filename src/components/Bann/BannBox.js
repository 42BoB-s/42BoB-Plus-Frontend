import { React, memo } from 'react';
import SearchIcon from '@material-ui/icons/Search';

const BannBox = memo(
  ({ onChangeInput, onFindCadet, onCancelBann, input, bannedCadets }) => {
    return (
      <div className="bann">
        <div className="head">
          <SearchIcon />

          <form onSubmit={onFindCadet}>
            <input
              onChange={onChangeInput}
              type="text"
              maxLength="12"
              className="search-user"
              value={input}
            />
          </form>
        </div>
        <div className="body">
          {bannedCadets.map(name => (
            <div className="banned">
              <text className="banned-id">{name}</text>
              <button
                type="button"
                className="banned-cancel"
                value={name}
                onClick={onCancelBann}
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
