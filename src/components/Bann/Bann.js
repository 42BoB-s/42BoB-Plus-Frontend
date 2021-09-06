import { React, useState } from 'react';
import Modal from './Modal';
import BannBox from './BannBox';
import './Bann.scss';

// 여러 개의 컴포넌트로 분할
/*
const Modal = ({ close, id, bann, message, type }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  let typeEvent;
  let text;

  const BannEvent = () => {
    // if 해당 아이디를 찾는다 - 존재하면 벤 추가해서 post, 존재하지 않으면 존재하지 않는다.
    // 차단했다면 아이디를 전달해야한다!
    bann(prevBann => [...prevBann, id]);
    close();
  };
  const CancelEvent = () => {
    bann(prevBann => prevBann.filter(e => e !== id));
    close();
  };

  // type에 따라 차단 함수 차단 해제 함수가 분기된다.
  if (type === 'bann') {
    typeEvent = BannEvent;
    text = '차단';
  } else {
    typeEvent = CancelEvent;
    text = '해제';
  }
  const BannNo = () => {
    // 그냥 취소
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className="modal">
      <section>
        <header>{text}</header>
        <main>
          <text className="id">{id}</text>
          {message}
        </main>
        <footer>
          <button type="button" className="yes" onClick={typeEvent}>
            {text}
          </button>
          <button type="button" className="close" onClick={BannNo}>
            취소
          </button>
        </footer>
      </section>
    </div>
  );
};

const BannBox = ({ FindCadet, changeInput, input, bannCadet, cancelBann }) => {
  return (
    <div className="bann">
      <div className="head">
        <SearchIcon />

        <form onSubmit={FindCadet}>
          <input
            onChange={changeInput}
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
              onClick={cancelBann}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
*/
const Bann = () => {
  const [input, setInput] = useState('');
  const [tempId, setTempId] = useState('');
  const [bannCadet, setBannCadet] = useState([]);
  const [bannModal, setBannModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const changeInput = e => {
    if (!bannModal) {
      setInput(e.currentTarget.value.replace(/[^A-Za-z]/gi, '')); // 영어만 입력되게끔
    }
  };
  const FindCadet = e => {
    e.preventDefault();
    if (!bannModal && input) {
      setBannModal(true);
      setTempId(input);
      setInput('');
    }
  };

  const closeModal = type => {
    if (type === 'Bann') {
      setBannModal(false);
    } else {
      setCancelModal(false);
    }
  };
  const cancelBann = e => {
    setCancelModal(true);
    setTempId(e.target.value);
  };

  return (
    <div className="bann-container">
      <div className="bann-box">
        <text className="title">차단 목록</text>
        <BannBox
          FindCadet={FindCadet}
          changeInput={changeInput}
          input={input}
          bannCadet={bannCadet}
          cancelBann={cancelBann}
        />
      </div>
      {bannModal && (
        <Modal
          key="modal"
          close={() => closeModal('Bann')}
          id={tempId}
          bann={setBannCadet}
          message="님을 차단하시겠습니까?"
          type="bann"
        />
      )}
      {cancelModal && (
        <Modal
          key="modal"
          close={() => closeModal('Cancel')}
          id={tempId}
          bann={setBannCadet}
          message="님을 차단해제하시겠습니까?"
          type="cancel"
        />
      )}
    </div>
  );
};

export default Bann;
