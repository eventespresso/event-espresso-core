import { formatISO } from 'date-fns';
import { add, sub } from '../../../../../../application/services/utilities/date';

import isExpired from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';
import { now } from '@sharedServices/utils/dateAndTime';

const testCases = [
	{
		desc: 'returns true when ticket.isExpired is true AND ticket end date is in the past',
		expired: true,
		futureEnd: true,
		result: true,
	},
	{
		desc: 'returns true when ticket.isExpired is true BUT ticket end date is in the future',
		expired: true,
		futureEnd: false,
		result: true,
	},
	{
		desc: 'returns true when ticket.isExpired is false BUT ticket end date is in the past',
		expired: false,
		futureEnd: false,
		result: true,
	},
	{
		desc: 'returns false when ticket.isExpired is false AND ticket end date is in the future',
		expired: false,
		futureEnd: true,
		result: false,
	},
];

const modifyDate = (inFuture: boolean): Date => (inFuture ? add('weeks', now, 1) : sub('weeks', now, 1));

describe('isExpired', () => {
	tickets.forEach((ticket) => {
		testCases.forEach(({ desc, expired, futureEnd, result }) => {
			const endDate = modifyDate(futureEnd);
			const newTicket = { ...ticket, endDate: formatISO(endDate), isExpired: expired };
			it(desc, () => {
				expect(isExpired(newTicket)).toBe(result);
			});
		});
	});
});
