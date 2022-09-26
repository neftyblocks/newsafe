// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';

import { Button, Card, Header, Segment } from 'semantic-ui-react';

import GlobalFragmentChainLogo from '../../../../../../../../../shared/components/Global/Fragment/ChainLogo';

const supportedChains = [
  'add7deb61981d83563f2c09f266acbfa48153f14453639b4a6259c4c8225d0e7',
];

class AccountSetupRecoverNetwork extends Component<Props> {
  render() {
    const {
      blockchains,
    } = this.props;
    return (
      <Segment basic>
        <Header>
          Select the network of the account to recover
          <Header.Subheader>
            The network is displayed on the Owner Key Certificate under the heading <strong>NETWORK</strong>.
          </Header.Subheader>
        </Header>
        <Segment basic padded textAlign="center">
          <p>Click the blockchain that matches what is displayed on your owner key certificate.</p>
          <Card.Group style={{
              'align-items': 'center',
              'justify-content': 'center',
            }}
          >
            {supportedChains.map(chainId => {
              const blockchain = find(blockchains, { chainId });
              return (
                <Card
                  onClick={() => this.props.onChangeNetwork(blockchain.chainId)}
                  raised
                  style={{
                    maxWidth: '96px',
                    width: 'auto'
                  }}
                >
                  <GlobalFragmentChainLogo
                    chainId={blockchain.chainId}
                    noPopup
                    style={{
                      background: 'white',
                      padding: '6px',
                      width: '96px'
                    }}
                  />
                  <Card.Content style={{ borderTop: 'none' }}>
                    <Card.Header>
                      {blockchain.name.replace('(EOS Testnet)', '')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Segment>
        <Button
          content="Back"
          fluid
          icon="caret left"
          onClick={this.props.onBack}
          style={{ marginTop: '1em' }}
        />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecoverNetwork);
