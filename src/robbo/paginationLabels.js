/**
 * Copyright (C) 2026 Robbo <https://robbo.ru>
 * SPDX-License-Identifier: AGPL-3.0-only
 * Part of the Robbo Open edX MFE overrides. See NOTICE at repository root.
 *
 * DataTable renders Pagination without `buttonLabels`, so Paragon's English
 * defaults are the only ones it can get. Must run after i18n is configured.
 */
import { getMessages } from '@edx/frontend-platform/i18n';
import { Pagination } from '@openedx/paragon';

const LABELS = ['previous', 'next', 'page', 'currentPage', 'pageOfCount'];

export default function applyPaginationLabels() {
  const catalog = getMessages() || {};
  const labels = { ...Pagination.defaultProps.buttonLabels };
  LABELS.forEach((label) => {
    labels[label] = catalog[`robbo.pagination.${label}`] || labels[label];
  });
  Pagination.defaultProps.buttonLabels = labels;
}
