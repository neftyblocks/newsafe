import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import SwapToken from './Swap/SwapToken';
import SwapTokenChoose from './Swap/SwapTokenChoose';

const SwapContainer = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route exact path="/swap" component={SwapTokenChoose} />
          <Route path="/swap/GNCO/:token" component={SwapToken} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
};

export default SwapContainer;
