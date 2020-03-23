import { formatISO } from 'date-fns';
import { add, sub } from '../../../../../../application/services/utilities/date';

import isOnSale from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';
import { now } from '@sharedServices/utils/dateAndTime';

const testCases = [
	{
		desc: 'returns false when ticket.isOnSale is false AND startDate is in the past AND endDate is in the past',
		onSale: false,
		futureStart: false,
		futureEnd: false,
		result: false,
	},
	{
		desc: 'returns false when ticket.isOnSale is false AND startDate is in the future AND endDate is in the past',
		onSale: false,
		futureStart: true,
		futureEnd: false,
		result: false,
	},
	{
		desc: 'returns false when ticket.isOnSale is false AND startDate is in the future AND endDate is in the future',
		onSale: false,
		futureStart: true,
		futureEnd: true,
		result: false,
	},
	{
		desc: 'returns true when ticket.isOnSale is true AND startDate is in the past AND endDate is in the past',
		onSale: true,
		futureStart: false,
		futureEnd: false,
		result: true,
	},
	{
		desc: 'returns true when ticket.isOnSale is false AND startDate is in the past AND endDate is in the future',
		onSale: false,
		futureStart: false,
		futureEnd: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isOnSale is true AND startDate is in the future AND endDate is in the future',
		onSale: true,
		futureStart: true,
		futureEnd: true,
		result: true,
	},
];

const modifyDate = (inFuture: boolean): Date => (inFuture ? add('weeks', now, 1) : sub('weeks', now, 1));

describe('isOnSale', () => {
	tickets.forEach((ticket) => {
		testCases.forEach(({ desc, onSale, futureStart, futureEnd, result }) => {
			const startDate = modifyDate(futureStart);
			const endDate = modifyDate(futureEnd);
			const newTicket = {
				...ticket,
				isOnSale: onSale,
				startDate: formatISO(startDate),
				endDate: formatISO(endDate),
			};
			it(desc, () => {
				expect(isOnSale(newTicket)).toBe(result);
			});
		});
	});
});
