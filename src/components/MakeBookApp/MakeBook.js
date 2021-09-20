import React, { useState } from 'react';
import './MakeBook.scss';

const MakeBook = ({ open, close }) => {
  const [title, setTitle] = useState('');
  const setSubmit = e => {
    setTitle(e.target.value);
    console.log(title);
  };

  return (
    <>
      {open && (
        <div className="modal">
          <div className="section">
            <input
              type="text"
              className="input-room"
              onChange={setSubmit}
              value={title}
            />

            <footer>
              <button type="button" className="finish" onClick={close}>
                만들기
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default MakeBook;
