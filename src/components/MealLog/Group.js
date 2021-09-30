import { React } from 'react';
import './MealLog.scss';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#15b2b3',
    fontSize: 40,
    marginTop: '5px',
  },
}));

const Group = ({ data, date }) => {
  const classes = useStyles();

  return (
    <span className="group">
      {data.map(e => (
        <ul className="group-person">
          <li>
            <PersonIcon className={classes.icon} />
          </li>
          <li className="group-person-id">{e}</li>
        </ul>
      ))}
      <span className="group-date">{date}</span>
    </span>
  );
};

export default Group;

/* 
const Test = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      <li>
        <PersonIcon className={classes.icon} />
      </li>
      <li className="group-person-id">{data}</li>
    </>
  );
};

const Group = ({ data, date }) => {
  const key = useRef(-1);

  return (
    <span className="group">
      {data.map(e => {
        key.current += 1;
        return <Test data={e} key={key.current} />;
      })}
      <text className="group-date">{date}</text>
    </span>
  );
};
*/
