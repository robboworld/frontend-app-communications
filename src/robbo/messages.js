/**
 * Copyright (C) 2026 Robbo <https://robbo.ru>
 * SPDX-License-Identifier: AGPL-3.0-only
 * Part of the Robbo Open edX MFE overrides. See NOTICE at repository root.
 */
import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  recipientMyself: { id: 'bulk.email.form.recipients.myself', defaultMessage: 'Myself' },
  recipientStaff: { id: 'bulk.email.form.recipients.staff', defaultMessage: 'Staff/Administrators' },
  recipientLearners: { id: 'bulk.email.form.recipients.learners', defaultMessage: 'All Learners' },
  recipientCohort: { id: 'bulk.email.form.cohort.label', defaultMessage: 'Cohort: {cohort}' },
  recipientTrack: { id: 'bulk.email.form.mode.label', defaultMessage: 'Learners in the {courseModeName} Track' },
  taskTypeBulkEmail: { id: 'robbo.task.type.bulk_course_email', defaultMessage: 'Course email' },
  taskStateFailure: { id: 'robbo.task.state.FAILURE', defaultMessage: 'Failed' },
  taskStatePending: { id: 'robbo.task.state.PENDING', defaultMessage: 'Pending' },
  taskStateProgress: { id: 'robbo.task.state.PROGRESS', defaultMessage: 'In progress' },
  taskStateQueuing: { id: 'robbo.task.state.QUEUING', defaultMessage: 'Queued' },
  taskStateRevoked: { id: 'robbo.task.state.REVOKED', defaultMessage: 'Cancelled' },
  taskStateScheduled: { id: 'robbo.task.state.SCHEDULED', defaultMessage: 'Scheduled' },
  taskStateSuccess: { id: 'robbo.task.state.SUCCESS', defaultMessage: 'Done' },
  taskMessageRevoked: { id: 'robbo.task.message.revoked', defaultMessage: 'Task revoked before running' },
  taskDurationUnknown: { id: 'robbo.task.duration.unknown', defaultMessage: 'unknown' },
});

export default messages;
