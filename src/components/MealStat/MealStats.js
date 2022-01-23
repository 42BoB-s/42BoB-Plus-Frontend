import React from 'react';
import './MealStat.scss';
import Avatar from '@material-ui/core/Avatar';
import ApartmentIcon from '@material-ui/icons/Apartment';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(2),
    width: 70,
    height: 70,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  icon: {
    color: '#15b2b3',
    fontSize: 40,
  },
}));

const MealStats = ({ info, code }) => {
  let comment;
  let icon;
  const classes = useStyles();
  const parseCode = () => {
    switch (code) {
      case 0: {
        comment = `지금까지 총 ${info}번 식사를 하셨네요!`;
        if (info === undefined) comment = '식사를 할 밥친구를 찾고 계시는군요!';
        icon = <RestaurantMenuIcon className={classes.icon} />;
        break;
      }
      case 1: {
        comment = `${info}를 주로 
		방문하셨네요!`;
        if (info === undefined) comment = '어디서 식사를 하시는지 알고 싶어요!';
        icon = <ApartmentIcon className={classes.icon} />;
        break;
      }
      case 2: {
        comment = `${info}를 사랑하는 당신은 ${info} 매니아!`;
        if (info === undefined) comment = '무엇을 좋아하시는지 알고 싶어요!';
        icon = <AssignmentIcon className={classes.icon} />;
        break;
      }
      case 3: {
        comment = `당신의 최고의 밥 친구는
		${info}입니다!`;
        if (info === undefined) comment = '당신의 최고의 밥 친구는 과연 누구?';

        icon = <GroupIcon className={classes.icon} />;

        break;
      }
      default:
    }

    return (
      <div className="flex-box">
        <Avatar className={classes.avatar}>{icon}</Avatar>
        <p className="text">{comment}</p>
      </div>
    );
  };
  return <>{parseCode()}</>;
};

export default MealStats;
