import { omit } from 'ramda';

import validStatus from './index';
import { nodes as datetimes } from '../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

describe('validStatus', () => {
	it('should return false if datetime has missing status property', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = omit(['status'], datetime);
			const result = validStatus(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime status property is null', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, status: null };
			const result = validStatus(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return false if datetime status property is undefined', () => {
		datetimes.forEach((datetime) => {
			const newDatetime: any = { ...datetime, status: undefined };
			const result = validStatus(newDatetime);
			expect(result).toBe(false);
		});
	});

	it('should return true if status prop is one of the DatetimeStatus enums', () => {
		datetimes.forEach((datetime) => {
			const result = validStatus(datetime);
			expect(result).toBe(true);
		});
	});
});
