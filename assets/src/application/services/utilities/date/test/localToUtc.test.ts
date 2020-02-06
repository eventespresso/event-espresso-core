import localToUtc from '../localToUtc';

describe('localToUtc', () => {
	it('returns the UTC time of the date in the time zone for a date input and IANA tz', () => {
		const result = localToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'America/Los_Angeles');
		expect(result.toISOString()).toBe('2014-06-25T17:00:00.123Z');
	});

	it('returns the UTC time of the date in the time zone for a string and IANA tz', () => {
		const result = localToUtc('2014-06-25T10:00:00.123', 'America/Los_Angeles');
		expect(result.toISOString()).toBe('2014-06-25T17:00:00.123Z');
	});

	it('returns the UTC time of the date for a UTC input', () => {
		const result = localToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'UTC');
		expect(result.toISOString()).toBe('2014-06-25T10:00:00.123Z');
	});

	it('returns the UTC time of the date in the time zone for a date input and tz offset', () => {
		const result = localToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), '+0400');
		expect(result.toISOString()).toBe('2014-06-25T06:00:00.123Z');
	});

	it('returns the UTC time of the date in the time zone for a string and tz offset', () => {
		const result = localToUtc('2014-06-25T10:00:00.123', '-02:00');
		expect(result.toISOString()).toBe('2014-06-25T12:00:00.123Z');
	});

	it('returns the UTC time of the date for the Z tz', () => {
		const result = localToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'Z');
		expect(result.toISOString()).toBe('2014-06-25T10:00:00.123Z');
	});
});
