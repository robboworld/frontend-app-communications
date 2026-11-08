// Modifications Copyright (C) 2026 Robbo. See NOTICE at repository root.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defineMessages, useIntl } from '@edx/frontend-platform/i18n';

import { getLocalizedCourseTabTitle } from './courseTabTitleMessages';
import Tabs from './tabs/Tabs';

import './navBar.scss';

const messages = defineMessages({
  courseMaterial: {
    id: 'navigation.course.tabs.label',
    defaultMessage: 'Course Material',
    description: 'The accessible label for course tabs navigation',
  },
});

// Robbo: the same tab bar as the Learning course pages (container-xl, tab titles by slug).
// The bulk email page belongs to the instructor dashboard, so its tab is the active one.
// course_metadata sends `tab_id` (camelCased to `tabId`); the test factory builds `slug`.
export default function NavigationTabs({ tabData }) {
  const intl = useIntl();

  return (
    <div id="courseTabsNavigation" className="course-tabs-navigation bg-white">
      <div className="container-xl">
        {!!tabData.length && (
          <Tabs
            className="nav-underline-tabs"
            aria-label={intl.formatMessage(messages.courseMaterial)}
          >
            {tabData.map(({
              tabId, slug = tabId, title, url,
            }) => (
              <a
                key={slug}
                className={classNames('nav-item flex-shrink-0 nav-link', { active: slug === 'instructor' })}
                href={url}
              >
                {getLocalizedCourseTabTitle(intl.formatMessage, slug, title)}
              </a>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}

NavigationTabs.propTypes = {
  tabData: PropTypes.arrayOf(PropTypes.shape({
    tabId: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  })),
};

NavigationTabs.defaultProps = {
  tabData: [],
};
