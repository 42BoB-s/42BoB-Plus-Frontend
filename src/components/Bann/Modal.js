import { React, memo, useState } from 'react';

const Modal = memo(({ close, id, bann, bannList, message, type, getUser }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [wrong, setWrong] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let typeEvent;
  let text;

  const BannEvent = () => {
    // if 해당 아이디를 찾는다 - 존재하면 벤 추가해서 post, 존재하지 않으면 존재하지 않는다.
    // 차단했다면 아이디를 전달해야한다!
    // 이미 차단한 경우에도 막아야만 한다.
    if (bannList.indexOf(id) !== -1) {
      setWrong(true);
      setErrorMessage('중복된 아이디입니다!');
    } else {
      getUser(id) // getUser는 async 함수로 선언되었기에 promise의 리턴형인 resolve(성공시 호출), reject(에러 시 호출)로 리턴이 된다. 그에 맞춰 우리는 then으로 resolve를, catch로 reject를 받는다.
        .then(userId => {
          if (userId === 'error') {
            setWrong(true);
            setErrorMessage('존재하지 않는 사용자입니다!');
          } else {
            bann(prevBann => [...prevBann, userId]);
            close();
          }
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    }
  };

  const CancelEvent = () => {
    bann(prevBann => prevBann.filter(e => e !== id));
    close();
  };

  if (type === 'bann') {
    typeEvent = BannEvent;
    text = '차단';
  } else {
    typeEvent = CancelEvent;
    text = '해제';
  }

  // type에 따라 차단 함수 차단 해제 함수가 분기된다.
  const BannNo = () => {
    // 그냥 취소
    close();
  };

  const closeWrong = () => {
    setWrong(false);
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <>
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
      {wrong && (
        <div className="small-modal">
          <section>
            <header>에러</header>
            <main>{errorMessage}</main>
            <footer>
              <button type="button" className="yes" onClick={closeWrong}>
                닫기
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
});

export default Modal;
