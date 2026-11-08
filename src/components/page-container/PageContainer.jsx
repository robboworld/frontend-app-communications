import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { Spinner } from '@openedx/paragon';

import { RobboFooter, RobboHeader } from '../../robbo-layout';
import NavigationTabs from '../navigation-tabs/NavigationTabs';

import { getCohorts, getCourseHomeCourseMetadata } from './data/api';

export const CourseMetadataContext = React.createContext();

export default function PageContainer(props) {
  const { children } = props;
  const { courseId } = useParams();

  const [courseMetadata, setCourseMetadata] = useState();

  useEffect(() => {
    async function fetchCourseMetadata() {
      let metadataResponse;
      let cohortsResponse;

      try {
        metadataResponse = await getCourseHomeCourseMetadata(courseId);
        cohortsResponse = await getCohorts(courseId);
      } catch (e) {
        setCourseMetadata({
          org: '',
          number: '',
          title: '',
          originalUserIsStaff: false,
          tabs: [],
          cohorts: [],
        });
        return;
      }

      const {
        org, number, title, tabs, originalUserIsStaff, courseModes,
      } = metadataResponse;
      const { cohorts } = cohortsResponse;

      setCourseMetadata({
        org,
        number,
        title,
        originalUserIsStaff,
        courseModes,
        tabs: [...tabs],
        cohorts: cohorts.map(({ name }) => name),
      });
    }
    fetchCourseMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (courseMetadata) {
    return (
      <CourseMetadataContext.Provider value={courseMetadata}>
        {/* Robbo: the site header, footer and course tabs of the Learning course pages (src/robbo-layout).
            No .robbo-layout-page: as in Learning and discussions the page keeps the Paragon font. */}
        <RobboHeader collapseNavIntoUserMenuOnNarrow />
        <main id="main-content">
          <NavigationTabs tabData={courseMetadata.tabs} />
          <div className="pb-3 container">
            {children}
          </div>
        </main>
        <RobboFooter />
      </CourseMetadataContext.Provider>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Spinner
        animation="border"
        variant="primary"
        role="status"
        screenreadertext="loading"
        className="spinner-border spinner-border-lg text-primary p-5 m-5"
      />
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
