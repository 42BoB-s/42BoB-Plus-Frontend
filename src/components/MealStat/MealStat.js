import { React, useState, useEffect } from 'react';
import { getStat } from 'apis';
import MealStats from './MealStats';
import './MealStat.scss';

const MealStat = () => {
  const [data, setData] = useState(['', '', '', '']);
  useEffect(async () => {
    const userLog = await getStat();
    const userLogData = await userLog.data;
    setData([
      userLogData.succeedStat,
      userLogData.locationStat,
      userLogData.menusStat,
      userLogData.name,
    ]);
    console.log(data);
  }, []);

  return (
    <div className="flex-container">
      {data &&
        data.map((object, i) => {
          return <MealStats info={object} code={i} />;
        })}
    </div>
  );
  // 4개의 자식 컴포넌트, 각 컴포넌트는 사용자의 정보에 따라 다른 값을 생성.
  // props을 줄때부터 바로 처리할 수 있도록 state의 배열 안에 해당되는 정보를 세팅해놔야 한다.
};

export default MealStat;
