import React from 'react';
import Profile from 'components/Profile';
import MealStat from 'components/MealStat';
import MealLog from 'components/MealLog';
import Bann from 'components/Bann';
import getUserInfoFromStorage from 'utils/getUserInfoFromStorage';

import './MyPage.scss';

const MyPage = () => {
  const { banDestList, banSrcList, email, id, ownedRoomList, profile } =
    getUserInfoFromStorage();
  console.log('api : ' + id);
  return (
    <div className="mypage">
      <></>
      <div>
        <Profile picture={profile} />

        <MealStat />

        <MealLog />

        <Bann />
      </div>
      <></>
    </div>
  );
};

export default MyPage;
