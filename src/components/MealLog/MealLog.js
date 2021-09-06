import { React, useState } from 'react';
import './MealLog.scss';
import PersonIcon from '@material-ui/icons/Person';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#15b2b3',
    fontSize: 40,
    marginTop: '5px',
  },
}));

const Group = ({ data }) => {
  const classes = useStyles();

  return (
    <span className="group">
      {data.map(() => (
        <PersonIcon className={classes.icon} />
      ))}
    </span>
  );
};

const MealLog = () => {
  // 한달 동안의 식사 기록을 받아와 파싱한다.
  // 같이 식사한 사람들에 대해 배열의 요소로 저장한다.
  // 식사 횟수 만큼 쟁반 아이콘을 추가한다.
  const time = new Date();
  const classes = useStyles();

  const [log, setLog] = useState([
    ['asdf', 'qwer'],
    ['zcx', 'cvb', 'bnm'],
    ['ㅁㅇㄴ'],
    ['ㅁㅂㅈ', 'qwewqr', 'zxc', 'asf'],
    ['asd', 'asd'],
    ['ㅁㅂㅈ', 'qwewqr', 'zxc', 'asf'],
    ['asd', 'asd'],
    ['ㅁㅂㅈ', 'qwewqr', 'zxc', 'asf'],
    ['asd', 'asd'],
    ['ㅁㅂㅈ', 'qwewqr', 'zxc', 'asf'],
    ['asd', 'asd'],
  ]);
  if (!time) setLog([]); // 임시 코드

  return (
    <div className="meal-log-container">
      <div className="meal-log-box">
        <text className="title">최근 식사</text>
        <div className="meal-log">
          <div className="head">
            <div className="month">{time.getMonth() + 1}월</div>
            <div>
              {log.map(() => {
                return <RestaurantIcon className={classes.icon} />;
              })}
            </div>
          </div>
          <div className="body">
            {log.map(
              array => (
                <Group data={array} />
              ),
              // 컴포넌트로 만들까?
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealLog;
