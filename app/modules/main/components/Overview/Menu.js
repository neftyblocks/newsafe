// @flow
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

class OverviewMenu extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`OverviewMenu '${key}' changed`)
    );
  }
  render() {
    const {
      stakedResources,
      view,
      viewChange,
      t,
    } = this.props;
    return (
      <Menu className="newsafe-menu" pointing secondary size="small">
        <Menu.Item
          active={view === 'systemtokens'}
          content={t('main_components_overview_menu_item_one')}
          name="systemtokens"
          onClick={viewChange}
        />
        <Menu.Item
          active={view === 'balances'}
          content={t('main_components_overview_menu_item_two')}
          name="balances"
          onClick={viewChange}
        />
        {(stakedResources)
          ? (
            <Menu.Item
              active={view === 'resources'}
              content={t('main_components_overview_menu_item_three')}
              name="resources"
              onClick={viewChange}
            />
          )
          : false
        }
        <Menu.Item
          active={view === 'governance'}
          content={t('main_components_overview_menu_item_four')}
          name="governance"
          onClick={viewChange}
        />
      </Menu>
    );
  }
}

export default withTranslation('main')(OverviewMenu);
