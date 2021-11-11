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
  const [roomList, setRoomList] = useState([]);
  const [close, show, componentWithModal] = useModal(false);
  const [roomFilterInfo, setRoomFilterInfo] = useState({});

  //   const fetchRoomList = async pageIndex => {
  //     const response = await getRoomList(pageIndex);
  //     if (response) {
  //       setRoomList(prev => [...prev, ...response]);
  //     }
  //   };

  //   const handleIntersect = useCallback(async () => {
  //     await fetchRoomList(currPageIndex);
  //     setCurrPageIndex(preState => preState + 1);
  //   }, [currPageIndex]);

  //   const footerRef = useRef();
  //   const [target, setTarget] = useIntersectionObserver({
  //     onIntersect: handleIntersect,
  //     targetElement: footerRef,
  //     options: { rootMargin: '10px' },
  //     changeDetection: currPageIndex,
  //   });

  const nameInputRef = useRef();
  const handleClick = () => {
    sessionStorage.setItem('username', nameInputRef.current.value);
  };

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
    }).then(({ data }) => {
      console.log([...data.roomList]);
    });
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const searchByRoomFilterInfo = filterInfo => {
    console.log(filterInfo);
    getRooms(0, 1, { ...filterInfo }).then(({ data }) => {
      console.log([...data.roomList]);
    });
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
          return (
            <Booked
              title={data.title}
              startTime={data.startTime}
              endTime={data.endTime}
              member={data.member}
              isBooked="true"
            />
          );
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
        {roomList.map(
          e => console.log(e),
          //     return (
          //       <Booked
          //         title={e.title}
          //         startTime={e.meetTime}
          //         endTime={e.meetTime}
          //         member={e.participants}
          //         isBooked={modalOpen}
          //       />
          //   );
        )}
      </div>
      {/* <footer ref={footerRef} /> */}
      {componentWithModal(
        <RoomFilter
          callback={searchByRoomFilterInfo}
          handleClickClose={close}
        />,
      )}
    </>
  );
};

export default Main;
