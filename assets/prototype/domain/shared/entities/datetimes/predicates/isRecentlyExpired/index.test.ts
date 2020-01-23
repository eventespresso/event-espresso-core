import { addWeeks, formatISO, subMonths, subWeeks } from 'date-fns';

import isRecentlyExpired from './index';
import { nodes as datetimes } from '../../../../../eventEditor/data/queries/datetimes/test/data';

describe('isRecentlyExpired', () => {
	it('should return false if endDate is in the future', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(addWeeks(new Date(), 1)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if endDate is more than a month ago', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(subMonths(new Date(), 1)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(false);
		});

		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(subWeeks(new Date(), 5)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return true if endDate is in the range of a month ago', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(subWeeks(new Date(), 3)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(true);
		});
	});
});
