import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import propTypes from 'prop-types';
import ChatLogContainer from './ChatLogContainer';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';

let socket;

const Chat = props => {
  const [chatLogs, setChatLogs] = useState([]);
  const { showModal, userName } = props;
  const bottomRef = useRef();

  useEffect(() => {
    socket = io('localhost:5000', { transports: ['websocket'] });
    console.log('socket ::', socket);

    socket.on(
      'RECEIVE_MESSAGE',
      msgInfo => {
        setChatLogs(preState => [
          ...preState,
          { isMyMessage: false, ...msgInfo },
        ]);
      },
      [],
    );

    return () => {
      socket.emit('disconnect');
    };
  }, []);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const sendMessage = msg => {
    const date = new Date();
    const currentTime = date.toString();
    const msgInfo = {
      id: chatLogs.length + 1,
      author: userName,
      message: msg,
      time: currentTime,
    };
    socket.emit('SEND_MESSAGE', msgInfo);
    setChatLogs(preState => [...preState, { isMyMessage: true, ...msgInfo }]);
  };

  return (
    <>
      <main className="chat">
        <ChatHeader showModal={showModal} roomName="재밌는 방" />
        <ChatLogContainer chatLogs={chatLogs} bottomRef={bottomRef} />
        <ChatInput callback={sendMessage} />
      </main>
    </>
  );
};

Chat.propTypes = {
  userName: propTypes.string.isRequired,
  showModal: propTypes.func.isRequired,
};

export default Chat;
