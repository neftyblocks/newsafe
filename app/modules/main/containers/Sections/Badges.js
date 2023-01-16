// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import BadgesList from './Badges/BadgesList';

class BadgesContainer extends Component<Props> {
  render = () => {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/badges" component={BadgesList} />
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

export default connect(mapStateToProps)(BadgesContainer);
