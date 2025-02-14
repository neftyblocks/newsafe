// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';
import { Header, Icon, Image, Label, Menu } from 'semantic-ui-react';
import { find } from 'lodash';

import Logo from '../../../renderer/assets/images/newsafe_black.svg';

import packageJson from '../../../package.json';
import { clearSystemState } from '../../../shared/actions/system/systemstate';
import * as NavigationActions from '../actions/navigation';
import * as SettingsActions from '../../../shared/actions/settings';
import * as TransactionActions from '../../../shared/actions/transaction';
import WalletPanelButtonBroadcast from '../../../shared/components/Wallet/Panel/Button/Broadcast';


class SidebarContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  toggleCollapsed = () => {
    const {
      actions,
      settings,
    } = this.props;
    actions.setSetting('sidebarCollapsed', !settings.sidebarCollapsed);
  };
  render() {
    const {
      actions,
      blockExplorers,
      certificates,
      connection,
      navigation,
      pending,
      settings,
      system,
      t,
      transaction,
      wallets,
    } = this.props;
    const {
      module
    } = navigation;
    const background = '#ffffff';
    const color = '#000000';
    // const devMode = process.env.NODE_ENV !== 'production';
    const devMode = false;
    const inSetup = (
      !settings.walletInit
      || !settings.walletHash
      || !settings.blockchains
      || !wallets
    );
    const pendingAccountRequests = pending && pending.accounts && pending.accounts.length > 0;
    const pendingCertificates = pending && pending.certificates && pending.certificates.length > 0;
    const pendingSigningRequest = pending && pending.request && pending.request.uri;
    let pendingRequests = 0;
    if (pendingAccountRequests) {
      pendingRequests += pending.accounts.length;
    }
    if (pendingCertificates) {
      pendingRequests += pending.certificates.length;
    }
    if (pendingSigningRequest) {
      pendingRequests += 1;
    }
    return (
      <Menu
        animation="overlay"
        className="nav-sidebar"
        icon={settings.sidebarCollapsed}
        pointing
        style={{
          display: 'flex',
          background: '#131B33',
          borderRadius: 0,
          borderRight: 'none',
          minHeight: '100vh',
        }}
        vertical
      >
        <Menu.Item
          as="a"
          onClick={(inSetup && settings.advancedOptions) ? this.onClick : undefined}
          name=""
          style={{
            backgroundSize: 'contain',
            borderRadius: 0,
            color,
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
            marginTop: '2em',
            marginBottom: '2em',
          }}
        >
          <Image
            src={Logo}
            style={{
              display: 'inline-block',
              width: ((settings.sidebarCollapsed) ? '4.5em' : '3.5em'),
            }}
          />
        </Menu.Item>
        {(!inSetup || (inSetup && settings.advancedOptions))
          ? (
            <Menu.Item
              as="a"
              active={(!module || module === 'home')}
              onClick={this.onClick}
              name=""
              style={{
                color,
              }}
            >
              {(!settings.sidebarCollapsed)
                ? <p>{t(inSetup ? 'setup' : 'home')}</p>
                : false
              }
            </Menu.Item>
          )
          : false
        }
        {(
          (!inSetup || (inSetup && settings.advancedOptions))
          &&
          (pendingAccountRequests || pendingSigningRequest || pendingCertificates))
          ? (
            <Menu.Item
              as="a"
              active={(module && module.startsWith('pending'))}
              onClick={this.onClick}
              name="pending"
              style={{
                color,
              }}
            >
              <Label
                color="grey"
                style={{
                  float: (settings.sidebarCollapsed) ? 'none' : 'right',
                  margin: 0,
                }}
              >
                {pendingRequests}
              </Label>
              {(!settings.sidebarCollapsed)
                ? <p>Pending Actions</p>
                : false
              }
            </Menu.Item>
          )
          : false
        }
        {(
          settings.walletMode !== 'cold'
          && settings.walletInit
          && settings.account
          && settings.chainId
          && wallets > 0
        )
          ? (
            <React.Fragment>
              <Menu.Item
                as="a"
                active={module && module.startsWith('wallet')}
                onClick={this.onClick}
                name="wallet"
                style={{
                  color,
                }}
              >
                {(!settings.sidebarCollapsed)
                  ? <p>{t('wallet')}</p>
                  : false
                }
              </Menu.Item>
              {(connection.stakedResources)
                ? (
                  <Menu.Item
                    as="a"
                    active={module && module.startsWith('account')}
                    onClick={this.onClick}
                    name={`account/${settings.account}`}
                    style={{
                      color,
                    }}
                  >
                    {(!settings.sidebarCollapsed)
                      ? <p>{t('resources')}</p>
                      : false
                    }
                  </Menu.Item>
                )
                : false
              }
              <Menu.Item
                as="a"
                active={module && module.startsWith('swap')}
                onClick={this.onClick}
                name="swap"
                style={{
                  color,
                }}
              >
                {(!settings.sidebarCollapsed)
                  ? <p>{t('swap')}</p>
                  : false
                }
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module && module.startsWith('badges')}
                onClick={this.onClick}
                name="badges"
                style={{
                  color,
                }}
              >
                {(!settings.sidebarCollapsed)
                  ? <p>{t('badges')}</p>
                  : false
                }
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module && module.startsWith('apps')}
                onClick={this.onClick}
                name="apps"
                style={{
                  color,
                }}
              >
                {(!settings.sidebarCollapsed)
                  ? <p>{t('apps')}</p>
                  : false
                }
              </Menu.Item>
              {/* <Menu.Item
                as="a"
                active={module && module.startsWith('governance')}
                onClick={this.onClick}
                name="governance/producers"
                style={{
                  color,
                }}
              >
               {(!settings.sidebarCollapsed)
                  ? <p>{t('governance')}</p>
                  : false
                }
              </Menu.Item> */}
            </React.Fragment>
          )
          : false
        }
        {(devMode === true)
          ? (
            <React.Fragment>
              <Menu.Item
                as="a"
                active={module === 'rps'}
                onClick={this.onClick}
                name="rps"
                color="green"
                style={{ color }}
              >
                {(!settings.sidebarCollapsed)
                  ? 'Resources'
                  : false
                }
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module === 'tests'}
                onClick={this.onClick}
                name="tests"
                color="red"
                style={{ color }}
              >
                {(!settings.sidebarCollapsed)
                  ? 'URI TESTS'
                  : false
                }
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module === 'devtest'}
                onClick={this.onClick}
                name="devtest"
                color="grey"
                style={{ color }}
              >
                {(!settings.sidebarCollapsed)
                  ? 'DevTests'
                  : false
                }
              </Menu.Item>
            </React.Fragment>
          )
          : false
        }
        {(settings.advancedOptions
         || (settings.walletInit
         && settings.account
         && settings.chainId))
          ? (
            <Menu.Item
              as="a"
              active={module && module.startsWith('tools')}
              onClick={this.onClick}
              name="tools"
              style={{
                color,
              }}
            >
              {(!settings.sidebarCollapsed)
                ? <p>{t('tools')}</p>
                : false
              }
            </Menu.Item>
          )
          : false
        }

        <Menu.Header
          style={{
            flexGrow: 1
          }}
        />
        {(
          false 
          && settings.walletInit
          && settings.chainId
          && (!inSetup || (inSetup && settings.advancedOptions))
        )
          ? (
            <WalletPanelButtonBroadcast
              actions={actions}
              blockExplorers={blockExplorers}
              color={color}
              settings={settings}
              system={system}
              transaction={transaction}
            />
          ) : false
        }

        <Menu.Item
          as="a"
          name="version"
          onClick={(inSetup && settings.advancedOptions) ? this.onClick : undefined}
          style={{
            borderRadius: 0,
            color,
            padding: '0.5em 0',
            textAlign: 'center',
          }}
        >
          <Header
            content={(!settings.sidebarCollapsed)
              ? `Version ${packageJson.version}`
              : packageJson.version
            }
            size="small"
            style={{
              color,
              margin: 0,
            }}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  const blockchain = find(state.blockchains, { chainId: state.settings.chainId });
  return {
    blockExplorers: (blockchain) ? state.blockexplorers[blockchain._id] : false,
    certificates: state.certificates,
    connection: state.connection,
    navigation: state.navigation,
    pending: state.pending,
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    wallets: state.wallets.length,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      ...NavigationActions,
      ...TransactionActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('menu'),
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarContainer);
