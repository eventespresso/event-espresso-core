import { renderHook } from '@testing-library/react-hooks';
import { format } from 'date-fns';

import useTimeZoneTime from '../useTimeZoneTime';
import { ApolloMockedProvider } from '../../../../domain/eventEditor/services/context/TestContext';

const formatString = "yyyy-MM-dd'T'HH:mm:ss.SSS";

describe('useTimeZoneTime', () => {
	const wrapper = ApolloMockedProvider();

	describe('siteTimeToUtc', () => {
		it('returns UTC date for ISO date string given in site timezone', () => {
			const testDate = '2020-01-28T13:00:20'; // in IST
			const expectedDate = '2020-01-28T07:30:20.000Z'; // in UTC (5:30 behind IST)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.siteTimeToUtc(testDate);

			expect(result.toISOString()).toBe(expectedDate);
		});

		it('returns UTC date for Date insatance given in site timezone', () => {
			const testDate = new Date(2020, 0 /* Jan */, 28, 13, 0, 20, 0); // in IST
			const expectedDate = '2020-01-28T07:30:20.000Z'; // in UTC (5:30 behind IST)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.siteTimeToUtc(testDate);

			expect(result.toISOString()).toBe(expectedDate);
		});
	});

	describe('utcToSiteTime', () => {
		it('returns date in site timezone for a given UTC date as ISO string', () => {
			const testDate = '2020-01-28T07:30:20.123Z'; // in UTC
			const expectedDate = '2020-01-28T13:00:20.123'; // in IST (5:30 ahead of UTC)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.utcToSiteTime(testDate);

			expect(format(result, formatString)).toBe(expectedDate);
		});

		it('returns date in site timezone for a given UTC date as Date insatance', () => {
			const testDate = new Date('2020-01-28T07:30:20.123Z'); // in UTC
			const expectedDate = '2020-01-28T13:00:20.123'; // in IST (5:30 ahead of UTC)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.utcToSiteTime(testDate);

			expect(format(result, formatString)).toBe(expectedDate);
		});
	});
});
