// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import { Button, Card, Form, Header, Segment, Step } from 'semantic-ui-react';

import { changeModule } from '../../../../modules/main/actions/navigation';
import GlobalFragmentChainLogo from '../../../components/Global/Fragment/ChainLogo';
import { swapBlockchain } from '../../../actions/blockchains';
import { setSetting } from '../../../actions/settings';

import GlobalBlockchainDropdown from './Dropdown';

const featuredChains = [
  // NEWCOIN
  'add7deb61981d83563f2c09f266acbfa48153f14453639b4a6259c4c8225d0e7',
  // // EOS
  // 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  // // FIO
  // '21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c',
  // // TELOS
  // '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
  // // PROTON
  // '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0',
  // // WAX
  // '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
];

class GlobalBlockchainChoose extends Component<Props> {
  state = {
    showTestnets: false
  }
  onChange = (e, { checked }) => this.setState({ showTestnets: checked })
  onSwap = (chainId) => {
    const {
      actions,
      history,
    } = this.props;
    actions.swapBlockchain(chainId);
    actions.setSetting('blockchains', [chainId]);
    history.push('');
  }
  goBack = () => {
    const { actions } = this.props;
    actions.setSetting('walletInit', false);
    actions.changeModule('home/init');
  }
  render() {
    const {
      blockchains,
      t,
    } = this.props;
    const {
      showTestnets
    } = this.state;
    const featured = blockchains.filter(b => featuredChains.includes(b.chainId));
    // TODO: choose
    return (
      <Segment basic style={{ marginTop: 0 }}>
        <Header
          content={t('global_blockchain_choose_header')}
          subheader={t('global_blockchain_choose_subheader')}
          size="large"
          style={{ marginTop: 0 }}
        />
        <div>
          <Card.Group style={{
              'align-items': 'center',
              'justify-content': 'flex-start',
              'text-align': 'center',
              marginTop: '1em',
            }}
          >
            {featured.map(blockchain => (
              <Card
                onClick={() => this.onSwap(blockchain.chainId)}
                style={{ width: 'auto', borderRadius: '4px' }}
              >
                <GlobalFragmentChainLogo
                  chainId={blockchain.chainId}
                  noPopup
                  style={{
                    width: '96px',
                    margin: '2em auto 1em'
                  }}
                />
                <Card.Content style={{ borderTop: 'none', textAlign: 'start' }}>
                  <Card.Header>{blockchain.name}</Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          {/* <Form style={{ marginTop: '3em' }}>
            <Header size="small">
              More options available in the dropdown below.
            </Header>
            <Form.Field>
              <GlobalBlockchainDropdown
                initialize
                onSwap={this.onSwap}
                search
                selection
                showTestnets={showTestnets}
                style={{ width: '30em' }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Checkbox
                label={t('global_blockchain_choose_show_testnets')}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <Button
                content="Back"
                icon="cancel"
                onClick={this.goBack}
              />
            </Form.Field>
          </Form> */}
        </div>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    navigation: state.navigation,
    settings: state.settings,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      setSetting,
      swapBlockchain,
    }, dispatch)
  };
}

export default compose(
  withTranslation('global'),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainChoose);
