// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Dimmer, Grid, Header, Image, Loader, Segment } from 'semantic-ui-react';
import Either from 'eitherx';

import ContentContainer from './Content';
import ContentErrorContainer from './ContentError';
import MenuContainer from './Menu';
import BottomMenuContainer from './BottomMenu';
import SidebarContainer from './Sidebar';

import { setWalletMode } from '../../../shared/actions/wallet';
import * as ValidateActions from '../../../shared/actions/validate';

import logo from '../../../renderer/assets/images/newsafe_white.svg';

const { ipcRenderer } = require('electron');

// Stupid hack to get electron handlers set
ipcRenderer.send('setHttpHandler');

class MainIndexContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { actions, connectionStatus, settings } = props;
    const { validateNode } = actions;
    if (settings.walletMode !== 'cold') {
      validateNode(settings.node, settings.chainId, false, true, true);
      if (connectionStatus !== 'SUCCESS' && settings.node) {
        this.state = {
          initialized: true
        };
      }
    }
    if (settings.walletInit && settings.walletMode) {
      actions.setWalletMode(settings.walletMode);
    }
  }
  state = {
    initialized: true,
    errorBoundaryKey: 0,
  };
  componentDidUpdate(prevProps) {
    if (
      !this.state.initialized
      && this.props.connectionStatus !== prevProps.connectionStatus
      && this.props.connectionStatus === 'SUCCESS'
    ) {
      this.setState({ initialized: true });
    }
  }
  render() {
    const {
      errorBoundaryKey,
      initialized,
    } = this.state;
    if (!initialized) {
      return (
        <Grid
          style={{
            height: '100%'
          }}
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column>
            <Segment basic style={{ marginTop: 0 }}>
              <Image
                alt="Newsafe Logo"
                centered
                src={logo}
                style={{
                  width: '256px',
                }}
              />
              <h1 style={{ color: 'white', marginTop: '1em', width: '256px' }}>Newsafe</h1>
            </Segment>
            Loading...
          </Grid.Column>
        </Grid>
      );
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        // alignContent: 'stretch',
        alignItems: 'flex-start',
      }}
      >
        <div style={{
          flex: '0 1 auto',
          position: 'sticky',
          top: 0,
        }}
        >
          <SidebarContainer />
        </div>
        <div style={{
          flex: '1 1 auto',
        }}
        >
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 999
          }}
          >
            <MenuContainer />
          </div>
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
          }}
          >
            <BottomMenuContainer />
          </div>
          <div style={{
            padding: '1.25em',
            paddingBottom: '5em'
          }}
          >
            <Either
              catchError={({ error, info }) => {
                console.log(info);
                console.error(error);
                return (
                  <ContentErrorContainer
                    error={error}
                  />
                );
              }}
              key={errorBoundaryKey}
              render={() => <ContentContainer />}
            />
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    connectionStatus: state.validate.NODE,
    settings: state.settings,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setWalletMode,
      ...ValidateActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainIndexContainer));
