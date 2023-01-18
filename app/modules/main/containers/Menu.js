// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Menu, Modal } from 'semantic-ui-react';

import * as AccountsActions from '../../../shared/actions/accounts';
import * as AppActions from '../../../shared/actions/app';
import * as BlockExplorersActions from '../../../shared/actions/blockexplorers';
import * as ChainActions from '../../../shared/actions/chain';
import * as DelphiOracleActions from '../../../shared/actions/blockchains/eos/delphioracle';
import * as GlobalsActions from '../../../shared/actions/globals';
import * as NavigationActions from '../actions/navigation';
import * as SyncActions from '../../../shared/actions/sync';
import * as WalletActions from '../../../shared/actions/wallet';

import isUnlocked from '../../../shared/utils/Anchor/Unlocked';
import GlobalAccountDropdown from '../../../shared/containers/Global/Account/Dropdown';
import GlobalAppDisconnected from '../../../shared/containers/Global/App/Disconnected';
import GlobalBlockchainDropdown from '../../../shared/containers/Global/Blockchain/Dropdown';
import GlobalFuelDropdown from '../../../shared/containers/Global/Fuel/Dropdown';
import GlobalHardwareLedgerStatus from '../../../shared/containers/Global/Hardware/Ledger/Status';
import SettingsContainer from './Sections/Settings';
import WalletLockState from '../../../shared/components/Wallet/LockState';
import WalletMode from '../../../shared/components/Wallet/Mode';

import makeGetKeysUnlocked from '../../../shared/selectors/getKeysUnlocked';

class MenuContainer extends Component<Props> {
  state = {
    showSettings: false
  }

  componentDidMount() {
    const {
      actions,
      settings,
    } = this.props;
    const {
      getBlockExplorers,
      initApp
    } = actions;
    initApp();
    getBlockExplorers();
    this.tick();
    if (parseInt(settings.refreshRate, 10) > 0) {
      this.interval = setInterval(
        this.tick.bind(this),
        settings.refreshRate * 1000
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    const { settings } = this.props;
    if (settings.refreshRate !== nextProps.refreshRate) {
      clearInterval(this.interval);
      if (parseInt(nextProps.settings.refreshRate, 10) > 0) {
        this.interval = setInterval(
          this.tick.bind(this),
          (nextProps.settings.refreshRate) * 1000
        );
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      settings,
      validate,
    } = this.props;
    const {
      sync,
      getConstants,
      getGlobals,
      getPriceFeed,
      getRamStats,
    } = actions;
    if (settings.walletMode !== 'cold' && validate.NODE === 'SUCCESS') {
      sync();
    }
  }

  hideSettings = () => this.setState({ showSettings: false })
  showSettings = () => this.setState({ showSettings: true })

  render() {
    const {
      settings,
      actions,
      pubkeys,
      validate,
      wallet,
      unlocked,
    } = this.props;
    const { showSettings } = this.state;
    const locked = !unlocked;
    return (
      <Menu
        className="nav-topbar"
        attached
        style={{
          border: 'none',
          margin: 0,
          minHeight: '4.428em',
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Modal
          closeIcon
          onClose={this.hideSettings}
          open={showSettings}
        >
          <Modal.Header>
            Anchor Settings
          </Modal.Header>
          <Modal.Content style={{ padding: 0 }}>
            <SettingsContainer
              onReset={this.hideSettings}
            />
          </Modal.Content>
        </Modal>

        <Menu.Menu position="right">
          <GlobalAccountDropdown
            onNavigationChange={this.props.actions.changeModule}
            style={{
              minWidth: '15em'
            }}
          />
          <GlobalBlockchainDropdown
            onNavigationChange={this.props.actions.changeModule}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    actions: state.actions,
    navigation: state.navigation,
    prompt: state.prompt,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets,
    unlocked: isUnlocked(state),
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...AppActions,
      ...BlockExplorersActions,
      ...ChainActions,
      ...DelphiOracleActions,
      ...GlobalsActions,
      ...NavigationActions,
      ...SyncActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  mapDispatchToProps
)(MenuContainer));
