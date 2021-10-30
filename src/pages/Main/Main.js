import Header from 'components/Header';
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  Component,
} from 'react';
import Booked from 'components/Booked';
import MakeBookApp from 'components/MakeBookApp';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import './Main.scss';
// import TestCard from 'components/testCard';
import getRoomList from 'apis/getRoomList';
import { getRooms } from 'apis';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import useModal from 'utils/hooks/useModal';
import RoomFilter from 'components/RoomFilter';

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
  const [currPageIndex, setCurrPageIndex] = useState(1);
  const [roomList, setLoomList] = useState([]);
  const [close, show, componentWithModal] = useModal(false);

  const fetchRoomList = async pageIndex => {
    const response = await getRoomList(pageIndex);
    if (response) {
      setLoomList(prev => [...prev, ...response]);
    }
  };

  const handleIntersect = useCallback(async () => {
    await fetchRoomList(currPageIndex);
    setCurrPageIndex(preState => preState + 1);
  }, [currPageIndex]);

  const footerRef = useRef();

  const [target, setTarget] = useIntersectionObserver({
    onIntersect: handleIntersect,
    targetElement: footerRef,
    options: { rootMargin: '10px' },
    changeDetection: currPageIndex,
  });

  console.log(target, setTarget);

  const nameInputRef = useRef();

  const handleClick = () => {
    sessionStorage.setItem('username', nameInputRef.current.value);
  };

  console.log(currPageIndex, setCurrPageIndex, roomList);

  // sham님 코드

  const [modalOpen, setModalOpen] = useState(false);
  const [bookedData, setBookedData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getRooms(0, 1, {
      location: 'default',
      menu: ['default'],
      startTime: 'default',
      endTime: 'default',
      keyword: 'default',
    }).then(console.log);
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
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <input ref={nameInputRef} />
      <button aria-label="saveName" type="button" onClick={handleClick}>
        임시저장
      </button>
      <div className="main-container">
        <text className="booked-title">
          <text className="booked-title-bold">내 밥 친구</text> 목록
        </text>
        {bookedData.map(data => {
          return <Booked data={data} />;
        })}
        <button className="make-book-button" type="button" onClick={openModal}>
          <Avatar className={classes.avatar}>{}</Avatar>
          <text className="text">
            <p>직접 메뉴를 골라 </p>
            <p>밥 친구를 모집해보세요!</p>
          </text>
        </button>
        <button type="button" onClick={show}>
          필터
        </button>
        <MakeBookApp open={modalOpen} close={closeModal} />
      </div>
      <section className="roomList">
        {roomList.map(e => {
          const data = {
            title: e.title,
            startTime: e.meetTime,
            endTime: '',
            member: e.participants,
          };
          return (
            //   <TestCard
            //     roomId={e.roomId}
            //     title={e.title}
            //     menus={e.menus}
            //     meetTime={e.meetTime}
            //     location={e.location}
            //     capacity={e.capacity}
            //     owner={e.owner}
            //     participants={e.participants}
            //     status={e.status}
            //   />
            <Booked data={data} />
          );
        })}
        <footer ref={footerRef} />
      </section>
      {componentWithModal(<RoomFilter handleClickClose={close} />)}
    </>
  );
};

export default Main;
