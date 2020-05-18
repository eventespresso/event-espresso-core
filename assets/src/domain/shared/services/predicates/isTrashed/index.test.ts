import isTrashed from './';
import { nodes as datetimes } from '../../../../eventEditor/services/apollo/queries/datetimes/test/data';

describe('isTrashed', () => {
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
