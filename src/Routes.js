import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Main, Chatting, Login, MyPage } from 'pages';
import { getLoginStatus } from 'apis';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/chatting" component={Chatting} />
        <Route exact path="/login" component={Login} />
        <RouteIfLogin exact path="/mypage" component={MyPage} />
      </Switch>
    </Router>
  );
};

const RouteIfLogin = ({ component: Component, ...rest }) => {
  const loginStatus = sessionStorage.getItem('loginStatus');

  return (
    <Route
      {...rest}
      render={props => {
        if (loginStatus === '1' && Component) {
          return <Component {...props} />;
        }

        return <Login />;
      }}
    />
  );
};

export default Routes;
