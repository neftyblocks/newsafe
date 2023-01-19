// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find } from 'lodash';

import { Header } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';

import { setSetting } from '../../../../../shared/actions/settings';
import OverviewSidebarBackupContainer from './Sidebar/Backup';
import GlobalSidebarSupport from '../../../components/Overview/Sidebar/Support';
import GlobalSidebarUpdate from '../../../components/Overview/Sidebar/Update';
import styled from 'styled-components';

class OverviewSidebarContainer extends Component<Props> {
  componentDidUpdate(prevProps) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Sidebar Prop '${key}' changed`));
  }
  render() {
    const {
      actions,
      app,
      settings,
      t,
    } = this.props;
    const {
      constants
    } = app;
    return (
      <React.Fragment>
        <Header>
          {t('main_sections_overview_sidebar_header')}
          <Header.Subheader>
            {t('main_sections_overview_sidebar_subheader')}
          </Header.Subheader>
        </Header>
        {/* <GlobalSidebarUpdate
          constants={constants}
          settings={settings}
        /> */}
        <BoxesContainer>
          <OverviewSidebarBackupContainer />
          <GlobalSidebarSupport />
        </BoxesContainer>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    blockchain: find(state.blockchains, { chainId: state.settings.chainId }),
    node: state.connection.httpEndpoint,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
    }, dispatch)
  };
}

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;

  .ui.segment {
    margin: 0;
  }
`


export default compose(
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(OverviewSidebarContainer);
