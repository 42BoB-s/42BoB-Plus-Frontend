import { React, useState, useEffect } from 'react';
import { getMyLog } from 'apis';
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

const Group = ({ data, date }) => {
  const classes = useStyles();

  return (
    <span className="group">
      {data.map(e => (
        <ul className="group-person">
          <li>
            <PersonIcon className={classes.icon} />
          </li>
          <li className="group-person-id">{e}</li>
        </ul>
      ))}
      <text className="group-date">{date}</text>
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
    [['asdf', 'qwer'], 4],
    [['zcx', 'cvb', 'bnm'], 6],
    [['za'], 9],
    [['zxvav', 'qwewqr', 'zxc', 'asf'], 11],
    [['asd', 'asd'], 13],
    [['qwr', 'qwewqr', 'zxc', 'asf'], 15],
    [['asd', 'asd'], 20],
    [['hgfdhrt', 'qwewqr', 'asf'], 21],
    [['asd', 'zxc', 'asd'], 22],
    [['vdsag', 'qwewqr', 'asf'], 24],
  ]);

  useEffect(async () => {
    const userLog = await getMyLog();
    console.log('log', userLog.data.data);
  }, []);

  return (
    <div className="meal-log-container">
      <div className="meal-log-box">
        <text className="title">최근 식사</text>
        <div className="meal-log">
          <div className="head">
            <div className="month">{time.getMonth() + 1}월</div>
            <div className="meal-time">
              {log.map(() => {
                return <RestaurantIcon className={classes.icon} />;
              })}
            </div>
          </div>
          <div className="body">
            {log.map(array => (
              <Group data={array[0]} date={array[1]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealLog;
