import React from 'react';
import Profile from 'components/Profile';
import MealStat from 'components/MealStat';
import MealLog from 'components/MealLog';

import './MyPage.scss';

const Bann = () => {
  return <div>밴 리스트 + 밴 해제 팝업창</div>;
};

const MyPage = () => {
  return (
    <>
      <div>
        <Profile />

        <MealStat />

        <MealLog />

        <Bann />
      </div>
    </>
  );
};

export default MyPage;
