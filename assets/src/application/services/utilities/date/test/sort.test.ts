import { sprintf } from '@wordpress/i18n';
import { reverse } from 'ramda';

import sort from '../sort';

const arrayToDate = (input: number[]): Date => {
	const [year, monthIndex, ...rest] = input;
	return new Date(year, monthIndex, ...rest);
};
const testCases = [
	{
		desc: 'sorts the dates array in %s order by year',
		unsorted: [
			[1995, 1],
			[1987, 1],
			[1982, 1],
			[1989, 1],
		],
		sorted: [
			[1982, 1],
			[1987, 1],
			[1989, 1],
			[1995, 1],
		],
	},
	{
		desc: 'sorts the dates array in %s order by month',
		unsorted: [
			[2019, 3 /* Apr */],
			[2019, 7 /* Aug */],
			[2019, 1 /* Feb */],
			[2019, 6 /* Jul */],
		],
		sorted: [
			[2019, 1],
			[2019, 3],
			[2019, 6],
			[2019, 7],
		],
	},
	{
		desc: 'sorts the dates array in %s order by day of the month',
		unsorted: [
			[2019, 8, 2],
			[2019, 8, 19],
			[2019, 8, 31],
			[2019, 8, 5],
		],
		sorted: [
			[2019, 8, 2],
			[2019, 8, 5],
			[2019, 8, 19],
			[2019, 8, 31],
		],
	},
	{
		desc: 'sorts the dates array in %s order by hour of the day',
		unsorted: [
			[2019, 8, 2, 23],
			[2019, 8, 2, 0],
			[2019, 8, 2, 5],
			[2019, 8, 2, 18],
		],
		sorted: [
			[2019, 8, 2, 0],
			[2019, 8, 2, 5],
			[2019, 8, 2, 18],
			[2019, 8, 2, 23],
		],
	},
	{
		desc: 'sorts the dates array in %s order by minute segment of the time',
		unsorted: [
			[2019, 8, 2, 23, 6],
			[2019, 8, 2, 23, 58],
			[2019, 8, 2, 23, 27],
			[2019, 8, 2, 23, 0],
		],
		sorted: [
			[2019, 8, 2, 23, 0],
			[2019, 8, 2, 23, 6],
			[2019, 8, 2, 23, 27],
			[2019, 8, 2, 23, 58],
		],
	},
	{
		desc: 'sorts the dates array in %s order by second segment of the time',
		unsorted: [
			[2019, 8, 2, 23, 57, 7],
			[2019, 8, 2, 23, 57, 0],
			[2019, 8, 2, 23, 57, 49],
			[2019, 8, 2, 23, 57, 13],
		],
		sorted: [
			[2019, 8, 2, 23, 57, 0],
			[2019, 8, 2, 23, 57, 7],
			[2019, 8, 2, 23, 57, 13],
			[2019, 8, 2, 23, 57, 49],
		],
	},
	{
		desc: 'sorts the dates array in %s order by millisecond segment of the time',
		unsorted: [
			[2019, 8, 2, 23, 57, 7, 100],
			[2019, 8, 2, 23, 57, 7, 5],
			[2019, 8, 2, 23, 57, 7, 970],
			[2019, 8, 2, 23, 57, 7, 67],
		],
		sorted: [
			[2019, 8, 2, 23, 57, 7, 5],
			[2019, 8, 2, 23, 57, 7, 67],
			[2019, 8, 2, 23, 57, 7, 100],
			[2019, 8, 2, 23, 57, 7, 970],
		],
	},
];

describe('sort dates', () => {
	describe('asc', () => {
		testCases.forEach(({ desc, unsorted, sorted }) => {
			it(sprintf(desc, 'ascending'), () => {
				const result = sort({ dates: unsorted.map(arrayToDate), order: 'asc' });
				expect(result).toEqual(sorted.map(arrayToDate));
			});
		});
	});

	describe('desc', () => {
		testCases.forEach(({ desc, unsorted, sorted }) => {
			it(sprintf(desc, 'descending'), () => {
				const result = sort({ dates: unsorted.map(arrayToDate), order: 'desc' });
				expect(result).toEqual(reverse(sorted).map(arrayToDate));
			});
		});
	});
});
