import React from 'react';
import './MakeBook.scss';

const SelectPlace = ({
  makeDirectionWheel,
  makeHourWheel,
  makeMinuteWheel,
}) => {
  return (
    <div className="select-place">
      {makeDirectionWheel()}
      {makeHourWheel()}
      {makeMinuteWheel()}
      <div className="split">:</div>
    </div>
  );
};

export default SelectPlace;
