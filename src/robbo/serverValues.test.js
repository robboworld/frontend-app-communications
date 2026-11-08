import { formatRecipients } from './serverValues';

const intl = {
  formatMessage: ({ defaultMessage }, values = {}) => Object.keys(values).reduce(
    (text, key) => text.replace(`{${key}}`, values[key]),
    defaultMessage,
  ),
};

describe('formatRecipients', () => {
  it('labels the short values of scheduled emails', () => {
    expect(formatRecipients(['myself', 'staff', 'learners'], intl)).toEqual('Myself, Staff/Administrators, All Learners');
    expect(formatRecipients(['cohort-Group A', 'track-verified'], intl))
      .toEqual('Cohort: Group A, Learners in the verified Track');
  });

  it('labels the long values of the email history', () => {
    expect(formatRecipients(['All students', 'Cohort: Group A', 'Course mode: Verified, Currency: USD'], intl))
      .toEqual('All Learners, Cohort: Group A, Learners in the Verified Track');
  });

  it('leaves unknown values as they are', () => {
    expect(formatRecipients(['something new'], intl)).toEqual('something new');
  });
});
