// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import AppsList from './Apps/AppsList';

class AppsContainer extends Component<Props> {
  render = () => {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/apps" component={AppsList} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}

export default connect(mapStateToProps)(AppsContainer);
