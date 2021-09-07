import { React } from 'react';

const Modal = ({ close, id, bann, bannList, message, type, getUser }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  let typeEvent;
  let text;

  const BannEvent = () => {
    // if 해당 아이디를 찾는다 - 존재하면 벤 추가해서 post, 존재하지 않으면 존재하지 않는다.
    // 차단했다면 아이디를 전달해야한다!
    // 이미 차단한 경우에도 막아야만 한다.
    if (bannList.indexOf(id) !== -1) {
      alert('중복된 아이디입니다!');
      close();
    } else if (getUser()) {
      bann(prevBann => [...prevBann, id]);
    } else {
      alert('잘못된 아이디입니다!');
    }
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

export default Modal;
