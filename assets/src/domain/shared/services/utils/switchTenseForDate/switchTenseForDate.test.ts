import { formatISO } from 'date-fns';

import switchTenseForDate from './index';

const headerFuture = 'sale starts';
const headerPast = 'sale started';
const footerFuture = 'sale ends';
const footerPast = 'sale ended';

const testCases = [
	{
		desc: 'for a given future start and end dates returns header future text and footer future text',
		input: {
			endDate: formatISO(new Date(2030, 8, 18, 19, 0, 52)),
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: formatISO(new Date(2029, 8, 18, 19, 0, 52)),
		},
		output: { headerText: headerFuture, footerText: footerFuture },
	},
	{
		desc: 'for a given past start and future end dates returns header past text and footer future text',
		input: {
			endDate: formatISO(new Date(2029, 8, 18, 19, 0, 52)),
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: formatISO(new Date(2003, 8, 18, 19, 0, 52)),
		},
		output: { headerText: headerPast, footerText: footerFuture },
	},
	{
		desc: 'for a given past start and past end dates returns header past text and footer past text',
		input: {
			endDate: formatISO(new Date(2004, 8, 18, 19, 0, 52)),
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: formatISO(new Date(2003, 8, 18, 19, 0, 52)),
		},
		output: { headerText: headerPast, footerText: footerPast },
	},
];

const nullishTestCases = [
	{
		desc: 'for a given null start returns null header and footer',
		input: {
			endDate: formatISO(new Date(2004, 8, 18, 19, 0, 52)),
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: null,
		},
		output: { headerText: null, footerText: null },
	},
	{
		desc: 'for a given null end returns null header and footer',
		input: {
			endDate: null,
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: formatISO(new Date(2004, 8, 18, 19, 0, 52)),
		},
		output: { headerText: null, footerText: null },
	},
	{
		desc: 'for a given null start and end returns null header and footer',
		input: {
			endDate: null,
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: null,
		},
		output: { headerText: null, footerText: null },
	},
	{
		desc: 'for a given null header and footer texts returns null header and footer',
		input: {
			endDate: formatISO(new Date(2004, 8, 18, 19, 0, 52)),
			footerFuture,
			footerPast,
			headerFuture,
			headerPast,
			startDate: formatISO(new Date(2003, 8, 18, 19, 0, 52)),
		},
		output: { headerText: headerPast, footerText: footerPast },
	},
];

describe('switchTenseForDate', () => {
	testCases.forEach(({ desc, input, output }) => {
		it(desc, () => {
			const result = switchTenseForDate(input);
			expect(result).toEqual(output);
		});
	});

	nullishTestCases.forEach(({ desc, input, output }) => {
		it(desc, () => {
			const result = switchTenseForDate(input);
			expect(result).toEqual(output);
		});
	});
});
