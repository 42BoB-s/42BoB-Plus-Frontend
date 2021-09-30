import { React, useState } from 'react';
import './MealLog.scss';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { makeStyles } from '@material-ui/core/styles';
import Group from './Group';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#15b2b3',
    fontSize: 40,
    marginTop: '5px',
  },
}));

const MealLog = () => {
  // 한달 동안의 식사 기록을 받아와 파싱한다.
  // 같이 식사한 사람들에 대해 배열의 요소로 저장한다.
  // 식사 횟수 만큼 쟁반 아이콘을 추가한다.
  const time = new Date();
  const classes = useStyles();

  const [log, setLog] = useState([
    { id: 0, member: ['asdf', 'qwer'], date: 4 },
    { id: 1, member: ['asdf', 'qwer', 'asfqqd'], date: 7 },
    { id: 2, member: ['asdf', 'qwer', 'zcvsdfw', 'wgezb'], date: 8 },
    { id: 3, member: ['asdf', 'qwer', 'vzre'], date: 12 },
    { id: 4, member: ['asdf', 'qwer', 'zzzz', 'vcxk'], date: 14 },
    { id: 5, member: ['asdf', 'qwer', 'qtw'], date: 18 },
    { id: 6, member: ['asdf', 'qwer', 'erewa'], date: 19 },
    { id: 7, member: ['asdf', 'xzvqw'], date: 21 },
    { id: 8, member: ['asdf', 'qwer'], date: 25 },
  ]);

  if (!time) setLog([]); // 임시 코드

  return (
    <div className="meal-log-container">
      <div className="meal-log-box">
        <text className="title">최근 식사</text>
        <div className="meal-log">
          <div className="head">
            <div className="month">{time.getMonth() + 1}월</div>
            <div className="meal-time">
              {log.map(object => {
                return (
                  <RestaurantIcon key={object.id} className={classes.icon} />
                );
              })}
            </div>
          </div>
          <div className="body">
            {log.map(object => (
              <Group key={object.id} data={object.member} date={object.date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealLog;
