import { React, memo, useState } from 'react';
import getUserId from 'utils/getUserId';

const Modal = memo(
  ({ onClose, id, setBann, bannList, message, type, token }) => {
    const [wrong, setWrong] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [clickEvent, setClickEvent] = useState(true);
    let handleTypeEvent;
    let text;

    const bannEvent = async () => {
      // if 해당 아이디를 찾는다 - 존재하면 벤 추가해서 post, 존재하지 않거나 중복될 시 모달 창 생성
      if (clickEvent) {
        setClickEvent(false); // 연속으로 클릭하는 것을 방지
        if (bannList.indexOf(id) !== -1) {
          setWrong(true);
          setErrorMessage('중복된 아이디입니다!');
        } else {
          const result = await getUserId(id, token);
          // getUserId는 async 함수로 선언되었기에 promise의 리턴형인 resolve(성공시 호출), reject(에러 시 호출)로 리턴이 된다. 그에 맞춰 우리는 then으로 resolve를, catch로 reject를 받는다.
          // id가 존재하지 않는 사용자라면 error 문자열을 리턴받는다.
          if (result === 'error') {
            setWrong(true);
            setErrorMessage('존재하지 않는 사용자입니다!');
          } else {
            setBann(prevBann => [...prevBann, result]);
            onClose();
          }
        }
        setClickEvent(true);
      }
    };

    const cancelEvent = () => {
      setBann(prevBann => prevBann.filter(e => e !== id));
      onClose();
    };

    // type에 따라 차단 함수 차단 해제 함수가 분기된다.
    if (type === 'bann') {
      handleTypeEvent = bannEvent;
      text = '차단';
    } else {
      handleTypeEvent = cancelEvent;
      text = '해제';
    }

    const handleNormalClose = () => {
      onClose();
    };

    const handleErrorClose = () => {
      setWrong(false);
      onClose();
    };

    return (
      <>
        <div className="modal">
          <section>
            <header>{text}</header>
            <main>
              <text className="id">{id}</text>
              {message}
            </main>
            <footer>
              <button type="button" className="yes" onClick={handleTypeEvent}>
                {text}
              </button>
              <button
                type="button"
                className="onClose"
                onClick={handleNormalClose}
              >
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
                <button
                  type="button"
                  className="yes"
                  onClick={handleErrorClose}
                >
                  닫기
                </button>
              </footer>
            </section>
          </div>
        )}
      </>
    );
  },
);

export default Modal;
