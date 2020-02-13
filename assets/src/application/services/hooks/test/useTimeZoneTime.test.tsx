import { renderHook } from '@testing-library/react-hooks';
import { formatISO } from 'date-fns';

import useTimeZoneTime from '../useTimeZoneTime';
import { ApolloMockedProvider } from '../../../../domain/eventEditor/services/context/TestContext';

describe('useTimeZoneTime', () => {
	const wrapper = ApolloMockedProvider();

	describe('localTimeToUtc', () => {
		it('returns UTC date for a given local date as ISO string', () => {
			const testDate = '2020-01-28T13:00:20'; // in IST
			const expectedDate = '2020-01-28T07:30:20.000Z'; // in UTC (5:30 behind IST)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.localTimeToUtc(testDate);

			expect(result.toISOString()).toBe(expectedDate);
		});

		it('returns UTC date for a given local date as Date insatance', () => {
			const testDate = new Date(2020, 0 /* Jan */, 28, 13, 0, 20, 0); // in IST
			const expectedDate = '2020-01-28T07:30:20.000Z'; // in UTC (5:30 behind IST)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.localTimeToUtc(testDate);

			expect(result.toISOString()).toBe(expectedDate);
		});
	});

	describe('utcToLocalTime', () => {
		it('returns local date for a given UTC date as ISO string', () => {
			const testDate = '2020-01-28T07:30:20.123Z'; // in UTC
			const expectedDate = '2020-01-28T13:00:20+5.5:30'; // in IST (5:30 ahead of UTC)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.utcToLocalTime(testDate);

			expect(formatISO(result)).toBe(expectedDate);
		});

		it('returns local date for a given UTC date as Date insatance', () => {
			const testDate = new Date('2020-01-28T07:30:20.123Z'); // in UTC
			const expectedDate = '2020-01-28T13:00:20+5.5:30'; // in IST (5:30 ahead of UTC)
			const {
				result: { current: TZ },
			} = renderHook(() => useTimeZoneTime(), { wrapper });

			const result = TZ.utcToLocalTime(testDate);

			expect(formatISO(result)).toBe(expectedDate);
		});
	});
});
