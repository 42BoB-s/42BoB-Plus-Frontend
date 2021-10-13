import React from 'react';
import propTypes from 'prop-types';
import './testCard.scss';

const testCard = props => {
  const {
    roomId,
    title,
    menus,
    meetTime,
    location,
    capacity,
    owner,
    participants,
    status,
  } = props;

  console.log('card');

  return (
    <>
      <div className="testCard">
        {roomId}
        <br />
        {title}
        <br />
        {menus.map(e => (
          <span>{e}</span>
        ))}
        <br />
        {meetTime}
        <br />
        {location}
        <br />
        {capacity}
        <br />
        {owner}
        <br />
        {participants.map(e => (
          <span>{e}</span>
        ))}
        <br />
        {status}
        <br />
      </div>
    </>
  );
};

testCard.propTypes = {
  roomId: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  menus: propTypes.arrayOf(propTypes.string).isRequired,
  meetTime: propTypes.string.isRequired,
  location: propTypes.string.isRequired,
  capacity: propTypes.number.isRequired,
  owner: propTypes.string,
  participants: propTypes.arrayOf(propTypes.string).isRequired,
  status: propTypes.string.isRequired,
};

export default testCard;
