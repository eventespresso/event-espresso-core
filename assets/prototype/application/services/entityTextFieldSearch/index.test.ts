import { Datetime } from '../../../domain/eventEditor/data/types';
import entityTextFieldSearch from './index';

const datetimes: Datetime[] = [
	{
		id: 'RGF0ZXRpbWU6ODM=',
		dbId: 83,
		capacity: -1,
		description: '',
		endDate: '2020-01-12T17:00:00+00:00',
		isActive: false,
		isExpired: false,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: true,
		length: 32400,
		name: 'test',
		order: 1,
		reserved: 0,
		sold: 0,
		startDate: '2020-01-12T08:00:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 85,
		capacity: -1,
		description: 'test desc',
		endDate: '2019-12-18T11:31:00+00:00',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: false,
		length: 0,
		name: 'just another datetime',
		order: 0,
		reserved: 0,
		sold: 0,
		startDate: '2019-12-18T11:31:00+00:00',
		__typename: 'EspressoDatetime',
	},
	{
		id: 'RGF0ZXRpbWU6ODU=',
		dbId: 85,
		capacity: -1,
		description: 'test desc',
		endDate: '2019-12-18T11:31:00+00:00',
		isActive: false,
		isExpired: true,
		isPrimary: false,
		isSoldOut: false,
		isUpcoming: false,
		length: 0,
		name: 'another title',
		order: 0,
		reserved: 0,
		sold: 0,
		startDate: '2019-12-18T11:31:00+00:00',
		__typename: 'EspressoDatetime',
	},
];

test('Search with one result', () => {
	const searchResult = entityTextFieldSearch({ entities: datetimes, searchText: 'just' });

	expect(Array.isArray(searchResult)).toBe(true);
	expect(searchResult.length).toBe(1);
	expect(searchResult[0].name).toBe('just another datetime');
});

test('Search with two results', () => {
	const searchResult = entityTextFieldSearch({ entities: datetimes, searchText: 'another' });

	expect(Array.isArray(searchResult)).toBe(true);
	expect(searchResult.length).toBe(2);
	expect(searchResult[0].name).toBe('just another datetime');
	expect(searchResult[1].name).toBe('another title');
});
