import React from 'react';
import SearchContainer from 'mastodon/features/compose/containers/search_container';
import ComposeFormContainer from 'mastodon/features/compose/containers/compose_form_container';
import NavigationContainer from 'mastodon/features/compose/containers/navigation_container';
import LinkFooter from './link_footer';
import TrendTagsContainer from '../../compose/containers/trend_tags_container';
import AnnouncementsContainer from '../../compose/containers/announcements_container';

const ComposePanel = () => (
  <div className='compose-panel'>
    <div className='drawer__pager'>
      <div className='drawer__inner'>
        <SearchContainer openInRoute />
        <NavigationContainer />
        <ComposeFormContainer />
        <AnnouncementsContainer />
        <TrendTagsContainer />
        <LinkFooter withHotkeys />
      </div>
    </div>
  </div>
);

export default ComposePanel;
