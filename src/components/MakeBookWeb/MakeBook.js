import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MakeBook.scss';

const MakeBook = props => {
  const { open, close } = props;
  const { isRadioSelected, changeHandler } = useState(true);

  const radioHandler = event => {
    changeHandler({ isRadioSelected: event.target.value });
  };
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            예약방 만들기
            <button type="button" className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className="position">
              <div>위치</div>
              <input type="radio" name="chk_pos" value="개포" checked />
              개포
              <input type="radio" name="chk_pos" value="서초" />
              서초
            </div>
            <div className="title">
              <div>제목</div>
              <input type="text" />
            </div>
            <div>
              <div className="peoples">인원 수</div>
              <input type="radio" name="chk_people" value="1" />1
              <input type="radio" name="chk_people" value="2" />2
              <input type="radio" name="chk_people" value="3" />3
              <div>
                <input type="radio" name="chk_people" value="직접입력" />
                <input
                  type="text"
                  id="other"
                  onChange={radioHandler}
                  disabled={isRadioSelected}
                />
              </div>
            </div>
          </main>
          <footer>
            <button type="button" className="finish" onClick={close}>
              만들기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

MakeBook.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default MakeBook;
