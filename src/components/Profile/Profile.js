import React, { useRef, useState } from 'react';
import './Profile.scss';
import defaultProfile from './default.png';

const Profile = () => {
  const [url, setUrl] = useState();
  const [userName, setUserName] = useState('user');
  const imgRef = useRef();

  const ImgOnclick = e => {
    e.preventDefault();
    imgRef.current.click();
  };

  const onImgChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      setUrl(reader.result);
    };
    setUserName('user');
  };

  const image = url || defaultProfile;
  return (
    <div className="container">
      <div>
        <img src={image} className="profile" alt="profile" />

        <button onClick={ImgOnclick} className="profileChange" type="button">
          {' '}
        </button>
      </div>

      <input
        type="file"
        className="profileImgInput"
        id="profileImgInput"
        accept="image/*"
        ref={imgRef}
        onChange={onImgChange}
      />
      <div className="text">{userName}</div>
    </div>
  );
};

export default Profile;
