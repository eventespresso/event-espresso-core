/**
 * Internal dependencies
 */
import aboveCapacity from './index';
import { Datetime } from '../../../../../eventEditor/data/types';

const dates: Datetime[] = [
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: -1,
		sold: 0,
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		sold: 5,
		status: 'ACTIVE',
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		sold: 6,
		status: 'ACTIVE',
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		sold: 7,
		status: 'ACTIVE',
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		sold: 8,
		status: 'ACTIVE',
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		sold: 9,
		status: 'ACTIVE',
	},
	{
		id: 'RGF0ZXRpbWU6ODM=',
		capacity: 10,
		sold: 10,
		status: 'ACTIVE',
	},
];

test('Should filter out dates based on above50Capacity show type', () => {
	const filteredDates = aboveCapacity({ capacity: 50, dates });

	expect(filteredDates.length).toBe(6);
	expect(filteredDates[0].capacity).toBe(10);
	expect(filteredDates[0].sold).toBe(5);
	expect(filteredDates[5].capacity).toBe(10);
	expect(filteredDates[5].sold).toBe(10);
});

test('Should filter out dates based on above75Capacity show type', () => {
	const filteredDates = aboveCapacity({ capacity: 75, dates });

	expect(filteredDates.length).toBe(3);
	expect(filteredDates[0].capacity).toBe(10);
	expect(filteredDates[0].sold).toBe(8);
	expect(filteredDates[1].capacity).toBe(10);
	expect(filteredDates[1].sold).toBe(9);
	expect(filteredDates[2].capacity).toBe(10);
	expect(filteredDates[2].sold).toBe(10);
});

test('Should filter out dates based on above90Capacity show type', () => {
	const filteredDates = aboveCapacity({ capacity: 90, dates });

	expect(filteredDates.length).toBe(2);
	expect(filteredDates[0].capacity).toBe(10);
	expect(filteredDates[0].sold).toBe(9);
	expect(filteredDates[1].capacity).toBe(10);
	expect(filteredDates[1].sold).toBe(10);
});
