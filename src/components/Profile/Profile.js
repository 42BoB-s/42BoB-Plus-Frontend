import React, { useRef, useState } from 'react';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';

import './Profile.scss';
import defaultProfile from './default.png';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(2),
    width: 70,
    height: 70,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
    fontSize: 30,
    position: 'absolute',
    transform: 'translate(-15px, -14px)',
  },
}));

const Profile = ({ picture, userId }) => {
  const [url, setUrl] = useState(picture);
  const imgRef = useRef();
  const classes = useStyles();

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
  };

  const image = url || defaultProfile;
  return (
    <div className="container">
      <div>
        <img src={image} className="profile" alt="profile" />

        <button onClick={ImgOnclick} className="profileChange" type="button">
          <CameraAltIcon className={classes.icon} />
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
      <div className="text">{userId}</div>
    </div>
  );
};

export default Profile;
