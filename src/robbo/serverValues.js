/**
 * Copyright (C) 2026 Robbo <https://robbo.ru>
 * SPDX-License-Identifier: AGPL-3.0-only
 * Part of the Robbo Open edX MFE overrides. See NOTICE at repository root.
 *
 * The LMS sends recipients and task fields as raw English values. Same labels
 * as in the instructor dashboard (lms/static/js/instructor_dashboard/util.js).
 */
import { getLocale } from '@edx/frontend-platform/i18n';

import messages from './messages';

const RECIPIENTS = {
  myself: messages.recipientMyself,
  Myself: messages.recipientMyself,
  staff: messages.recipientStaff,
  'Staff and instructors': messages.recipientStaff,
  learners: messages.recipientLearners,
  'All students': messages.recipientLearners,
};

const TASK_TYPES = { bulk_course_email: messages.taskTypeBulkEmail };

const TASK_STATES = {
  FAILURE: messages.taskStateFailure,
  PENDING: messages.taskStatePending,
  PROGRESS: messages.taskStateProgress,
  QUEUING: messages.taskStateQueuing,
  REVOKED: messages.taskStateRevoked,
  SCHEDULED: messages.taskStateScheduled,
  SUCCESS: messages.taskStateSuccess,
};

// Scheduled emails send `cohort-<name>` / `track-<slug>`, the history sends long_display().
const COHORT = /^(?:cohort[-:]|Cohort: )(.+)$/;
const TRACK = /^(?:track[-:]|Course mode: )([^,]+)/;

function formatRecipient(target, intl) {
  if (RECIPIENTS[target]) {
    return intl.formatMessage(RECIPIENTS[target]);
  }
  const cohort = target.match(COHORT);
  if (cohort) {
    return intl.formatMessage(messages.recipientCohort, { cohort: cohort[1] });
  }
  const track = target.match(TRACK);
  if (track) {
    return intl.formatMessage(messages.recipientTrack, { courseModeName: track[1] });
  }
  return target;
}

export function formatRecipients(targets, intl) {
  return targets.map((target) => formatRecipient(target, intl)).join(', ');
}

export function formatTaskType(taskType, intl) {
  return TASK_TYPES[taskType] ? intl.formatMessage(TASK_TYPES[taskType]) : taskType;
}

export function formatTaskState(taskState, intl) {
  return TASK_STATES[taskState] ? intl.formatMessage(TASK_STATES[taskState]) : taskState;
}

export function formatTaskDuration(duration, intl) {
  return duration === 'unknown' ? intl.formatMessage(messages.taskDurationUnknown) : duration;
}

// The LMS sends this one without translation: a deleted scheduled email ends with it.
export function formatTaskMessage(taskMessage, intl) {
  return taskMessage === 'Task revoked before running' ? intl.formatMessage(messages.taskMessageRevoked) : taskMessage;
}

// toLocaleString() alone follows the browser language, not the language of the site.
export function formatDateTime(value) {
  return new Date(value).toLocaleString(getLocale());
}
