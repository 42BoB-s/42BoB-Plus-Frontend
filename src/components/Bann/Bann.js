import { React, useState } from 'react';
import './Bann.scss';

const Modal = ({ close, id, bann }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const BannYes = () => {
    // if 해당 아이디를 찾는다 - 존재하면 벤 추가해서 post, 존재하지 않으면 존재하지 않는다.
    // 차단했다면 아이디를 전달해야한다!
    bann(prevBann => [...prevBann, id]);
    close();
    fetch('http://localhost:3001/v2/campus')
      .then(res => res.json())
      .then(res => console.log(res));
  };
  const BannNo = () => {
    // 그냥 취소
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className="openModal modal">
      <section>
        <header>차단</header>
        <main>{id}님을 차단하시겠습니까?</main>
        <footer>
          <button type="button" className="yes" onClick={BannYes}>
            차단
          </button>
          <button type="button" className="close" onClick={BannNo}>
            해제
          </button>
        </footer>
      </section>
    </div>
  );
};
const Bann = () => {
  const [input, setInput] = useState('');
  const [tempId, setTempId] = useState('');
  const [bannCadet, setBannCadet] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const changeInput = e => {
    if (!modalOpen) setInput(e.currentTarget.value);
  };
  const FindCadet = e => {
    e.preventDefault();

    if (!modalOpen && input) {
      setModalOpen(true);
      setTempId(input);
      setInput('');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bann-container">
      <div className="bann-box">
        <text className="title">차단 목록</text>
        <div className="bann">
          <div className="head">
            <span> 아이콘</span>

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
            {bannCadet.map(e => (
              <div>{e}</div>
            ))}
            차단한 사람들 map으로 아이콘? 이름, 삭제 버튼
            {modalOpen && (
              <Modal
                key="modal"
                close={closeModal}
                id={tempId}
                bann={setBannCadet}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bann;
