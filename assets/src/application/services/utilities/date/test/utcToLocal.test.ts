import { format } from 'date-fns';
import utcToLocal from '../utcToLocal';

describe('localToUtc', () => {
	it('returns the equivalent date at the time zone for a date string and IANA tz', () => {
		const result = utcToLocal('2014-06-25T10:00:00.123Z', 'America/New_York');
		expect(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS")).toBe('2014-06-25T06:00:00.123');
	});

	it('returns the equivalent date at the time zone for a date instance and IANA tz', () => {
		const result = utcToLocal(new Date('2014-06-25T10:00:00.123Z'), 'Europe/Paris');
		expect(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS")).toBe('2014-06-25T12:00:00.123');
	});

	it('returns the same date/time for UTC', () => {
		const result = utcToLocal('2014-06-25T10:00:00.123Z', 'UTC');
		expect(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS")).toBe('2014-06-25T10:00:00.123');
	});

	it('returns the equivalent date at the time zone for a date string and tz offset', () => {
		const result = utcToLocal('2014-06-25T10:00:00.123Z', '-04:00');
		expect(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS")).toBe('2014-06-25T06:00:00.123');
	});

	it('returns the equivalent date at the time zone for a date instance and tz offset', () => {
		const result = utcToLocal(new Date('2014-06-25T10:00:00.123Z'), '+0200');
		expect(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS")).toBe('2014-06-25T12:00:00.123');
	});

	it('returns the same date/time for Z', () => {
		const result = utcToLocal('2014-06-25T10:00:00.123Z', 'Z');
		expect(format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS")).toBe('2014-06-25T10:00:00.123');
	});
});
