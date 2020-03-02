import { formatISO } from 'date-fns';

import isRecentlyExpired from './index';
import { nodes as datetimes } from '../../../../../eventEditor/services/apollo/queries/datetimes/test/data';
import { add, sub } from '../../../../../../application/services/utilities/date';

describe('isRecentlyExpired', () => {
	it('should return false if endDate is in the future', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(add('weeks', new Date(), 1)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if endDate is more than a month ago', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(sub('days', new Date(), 31)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(false);
		});

		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(sub('weeks', new Date(), 5)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return true if endDate is in the range of a month ago', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, endDate: formatISO(sub('weeks', new Date(), 3)) };
			const result = isRecentlyExpired(newDatetime);
			expect(result).toBe(true);
		});
	});
});
