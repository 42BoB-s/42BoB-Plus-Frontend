import { React, memo } from 'react';
import SearchIcon from '@material-ui/icons/Search';

const BannBox = memo(
  ({ handleSumbit, handleChange, input, bannCadet, handleClick }) => {
    return (
      <div className="bann">
        <div className="head">
          <SearchIcon />

          <form onSubmit={handleSumbit}>
            <input
              onChange={handleChange}
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
                onClick={handleClick}
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
