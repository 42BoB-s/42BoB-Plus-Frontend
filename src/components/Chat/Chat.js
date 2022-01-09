import React, { useState, useRef, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import ChatSocket from 'utils/chatSocket';
import ChatLogContainer from './ChatLogContainer';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';

let socket;

const Chat = props => {
  const [chatLogs, setChatLogs] = useState([]);
  const { showModal, roomTitle, roomId, userId } = props;
  const bottomRef = useRef();
  let chatSocket;

  useEffect(() => {
    const handleMessage = e => {
      const messageInfoList = JSON.parse(e.data);
      // 에러 코드에 관해선 노션 참고!!
      if (messageInfoList.interCode) {
        switch (messageInfoList.interCode) {
          case -9:
            alert('참여할 수 있는 방이 아닙니다. (intercode: -9)');
            window.location.replace('/');
            break;
          default:
            alert(`채팅방 진입 에러(intercode: ${messageInfoList.interCode})`);
        }
      } else {
        JSON.parse(messageInfoList).forEach(messageInfo => {
          const { messageType, writer, time, message } = messageInfo;
          const isMyMessage = writer === userId;
          const chatLogMsgInfo = {
            id: time.toString(), // 임시;
            author: writer,
            message: message,
            time: time,
          };
          setChatLogs(preState => [
            ...preState,
            { isMyMessage: isMyMessage, ...chatLogMsgInfo },
          ]);
        });
      }
    };

    chatSocket = new ChatSocket(roomId, userId, handleMessage);

    return () => {
      chatSocket.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'auto' });
  });

  const sendMsgWithSocket = useCallback(msg => {
    chatSocket.send(msg);
  }, []);

  const sendMessage = msg => {
    sendMsgWithSocket(msg);
  };

  return (
    <>
      <main className="chat">
        <ChatHeader showModal={showModal} roomTitle={roomTitle} />
        <ChatLogContainer chatLogs={chatLogs} bottomRef={bottomRef} />
        <ChatInput callback={sendMessage} />
      </main>
    </>
  );
};

export default Chat;
