import { React, useState, useEffect } from 'react';
import Modal from './Modal';
import BannBox from './BannBox';
import './Bann.scss';

const Bann = () => {
  const [input, setInput] = useState('');
  const [tempId, setTempId] = useState('');
  const [bannCadet, setBannCadet] = useState([]);
  const [bannModal, setBannModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [token, setToken] = useState();
  const url = 'https://api.intra.42.fr/oauth/token';
  const query =
    '?' +
    'grant_type=client_credentials' +
    '&' +
    'client_id=' +
    '1cfa80163094e499e10108bfa2adb76409f5daec2084c00ce81a9c3a38416deb' +
    '&' +
    'client_secret=' +
    '1a3c7803cac7d2019618214318b6000842ce4983f37ac958407b5b3d50817422' +
    '&' +
    'redirect_uri=' +
    'http://localhost:3000/mypage' +
    '&' +
    'scope=public';
  const bearer = 'Bearer ';

  useEffect(async () => {
    const fetchToken = await fetch(url + query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Mobile': 'false',
        'response-Type': 'text',
      },
    });
    const response = await fetchToken.json();
    setToken(response.access_token);
    // console.log(response.access_token);
  }, []);

  const getUser = async id => {
    try {
      const fetchId = await fetch(`https://api.intra.42.fr/v2/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer + token,
          'response-Type': 'text',
        },
      });
      if (fetchId.ok === false) {
        return 'error'; // throw로 catch로 넘겨줄 수도 없기에 리턴받는 값이 if문에서 걸러지게 error를 전송.
      }
      const result = await fetchId.json();
      // console.log(result);
      return result.login;
    } catch (e) {
      // 사용자 문제가 아닌 자바스크립트 내부에서 에러가 발생했을 때 catch 사용?
      return e;
    }
  };

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
          key="bannbox"
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
          bannList={bannCadet}
          message="님을 차단하시겠습니까?"
          type="bann"
          getUser={getUser}
        />
      )}
      {cancelModal && (
        <Modal
          key="modal"
          close={() => closeModal('Cancel')}
          id={tempId}
          bannList={bannCadet}
          bann={setBannCadet}
          message="님을 차단해제하시겠습니까?"
          type="cancel"
        />
      )}
    </div>
  );
};

export default Bann;
