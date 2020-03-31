import { formatISO } from 'date-fns';

import switchTenseForDate from './index';

const textForFuture = 'sale starts';
const textForPast = 'sale started';

const testCases = [
	{
		desc: 'for a given future date returns future text',
		input: [formatISO(new Date(2030, 8, 18, 19, 0, 52)), textForPast, textForFuture],
		output: textForFuture,
	},
	{
		desc: 'for a given past date returns past text',
		input: [formatISO(new Date(2009, 8, 18, 19, 0, 52)), textForPast, textForFuture],
		output: textForPast,
	},
	{
		desc: 'for a given null date(other arguments being not null) date returns null',
		input: [null, textForPast, textForFuture],
		output: null,
	},
	{
		desc: 'for a given null past text(other arguments being not null) date returns null',
		input: [formatISO(new Date(2009, 8, 18, 19, 0, 52)), null, textForFuture],
		output: null,
	},
	{
		desc: 'for a given null future text(other arguments being not null) date returns null',
		input: [formatISO(new Date(2009, 8, 18, 19, 0, 52)), textForPast, null],
		output: null,
	},
];

describe('switchTenseForDate', () => {
	testCases.forEach(({ desc, input, output }) => {
		it(desc, () => {
			const [date, textForPastDate, textForFutureDate] = input;
			const result = switchTenseForDate(date, textForPastDate, textForFutureDate);
			expect(result).toEqual(output);
		});
	});
});
