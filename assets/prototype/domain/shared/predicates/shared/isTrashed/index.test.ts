import { omit } from 'ramda';

import isTrashed from './';
import { nodes as datetimes } from '../../../../eventEditor/data/queries/datetimes/test/data';

describe('isTrashed', () => {
	it('should return false if isTrashed prop is undefined', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = omit(['isTrashed'], datetime);
			const result = isTrashed(newDatetime);
			expect(result).toBe(undefined);
		});

		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isTrashed: null };
			const result = isTrashed(newDatetime);
			expect(result).toBe(null);
		});

		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isTrashed: undefined };
			const result = isTrashed(newDatetime);
			expect(result).toBe(undefined);
		});
	});

	it(`should return false if isTrashed prop is boolean and it's value is false`, () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isTrashed: false };
			const result = isTrashed(newDatetime);
			expect(result).toBe(false);
		});
	});

	it(`should return true if isTrashed prop is boolean and it's value is true`, () => {
		datetimes.forEach((datetime) => {
			const newDatetime = { ...datetime, isTrashed: true };
			const result = isTrashed(newDatetime);
			expect(result).toBe(true);
		});
	});
});
