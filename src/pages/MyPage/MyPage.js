import React, { useEffect } from 'react';
import Profile from 'components/Profile';
import MealStat from 'components/MealStat';
import MealLog from 'components/MealLog';
import Bann from 'components/Bann';
import axios from 'axios';
import getStat from 'apis/getStat';

import './MyPage.scss';

const MyPage = () => {
  useEffect(async () => {
    const userInfo = await getStat();
    console.log(userInfo.data);
  }, []);
  return (
    <div className="mypage">
      <></>
      <div>
        <Profile />

        <MealStat />

        <MealLog />

        <Bann />
      </div>
      <></>
    </div>
  );
};

export default MyPage;
