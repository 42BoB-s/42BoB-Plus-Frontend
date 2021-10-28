import { React, useState, useEffect } from 'react';
import getToken from 'utils/getToken';
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

  useEffect(() => {
    const fectFunction = async () => {
      const response = await getToken();
      setToken(response.access_token);
    };
    fectFunction();
  }, []);

  const changeBannInput = e => {
    if (!bannModal) {
      setInput(e.currentTarget.value.replace(/[^A-Za-z]/gi, '')); // 영어만 입력되게끔
    }
  };

  const openBannModal = e => {
    e.preventDefault();
    if (!bannModal && input) {
      setBannModal(true);
      setTempId(input);
      setInput('');
    }
  };

  const setModalType = buttonEventType => {
    if (buttonEventType === 'Bann') {
      setBannModal(false);
    } else {
      setCancelModal(false);
    }
  };
  const removeBanned = e => {
    setCancelModal(true);
    setTempId(e.target.value);
  };

  return (
    <div className="bann-container">
      <div className="bann-box">
        <text className="title">차단 목록</text>
        <BannBox
          key="bannbox"
          handleSumbit={openBannModal}
          handleChange={changeBannInput}
          input={input}
          bannCadet={bannCadet}
          handleClick={removeBanned}
        />
      </div>
      {bannModal && (
        <Modal
          key="modal"
          handleCloseModal={() => setModalType('Bann')}
          id={tempId}
          bann={setBannCadet}
          bannList={bannCadet}
          message="님을 차단하시겠습니까?"
          buttonEventType="bann"
          token={token}
        />
      )}
      {cancelModal && (
        <Modal
          key="modal"
          handleCloseModal={() => setModalType('Cancel')}
          id={tempId}
          bannList={bannCadet}
          bann={setBannCadet}
          message="님을 차단해제하시겠습니까?"
          buttonEventType="cancel"
        />
      )}
    </div>
  );
};

export default Bann;
