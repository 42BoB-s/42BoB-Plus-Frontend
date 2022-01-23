import React from 'react';
import Profile from 'components/Profile';
import MealStat from 'components/MealStat';
import MealLog from 'components/MealLog';
import Bann from 'components/Bann';
import getUserInfoFromStorage from 'utils/getUserInfoFromStorage';

import './MyPage.scss';

const MyPage = () => {
  const { id, profile } = getUserInfoFromStorage();
  return (
    <div className="mypage">
      <></>
      <div>
        <Profile picture={profile} userId={id} />

        <MealStat />

        <MealLog />

        <Bann />
      </div>
      <></>
    </div>
  );
};

export default MyPage;
