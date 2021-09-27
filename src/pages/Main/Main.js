import Booked from 'components/Booked';
import MakeBookApp from 'components/MakeBookApp';
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import './Main.scss';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(2),
    width: 70,
    height: 70,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  icon: {
    color: '#15b2b3',
    fontSize: 40,
  },
}));

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookedData, setBookedData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setBookedData([
      {
        title: '같이 짬뽕 먹어요!',
        startTime: '20:00',
        endTime: '21:00',
        member: ['sham', 'chahan', 'yeoncha'],
      },
      {
        title: '같이 치킨 먹어요!',
        startTime: '22:00',
        endTime: '23:00',
        member: ['sham', 'chahan', 'yeoncha', 'tjeong'],
      },
    ]);
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="main-container">
      <text className="booked-title">
        <text className="booked-title-bold">내 밥 친구</text> 목록
      </text>
      {bookedData.map(data => {
        return <Booked data={data} />;
      })}
      <button className="make-book-button" type="button" onClick={openModal}>
        <Avatar className={classes.avatar}>{}</Avatar>
        <text className="text">직접 메뉴를 골라 밥 친구를 모집해보세요!</text>
      </button>
      <MakeBookApp open={modalOpen} close={closeModal} />
    </div>
  );
};

export default Main;
