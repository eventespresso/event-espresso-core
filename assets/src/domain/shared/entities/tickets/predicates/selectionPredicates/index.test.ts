import { last, omit } from 'ramda';

import {
	isTicketField,
	updateTicketPrice,
	updateReverseCalculate,
	updateTicketPriceForTicket,
	updateTicketReverseCalculate,
} from './index';
import { nodes as tickets } from '../../../../../eventEditor/services/apollo/queries/tickets/test/data';

describe('isTicketField', () => {
	it('should return true if field is included in ticket type', () => {
		tickets.forEach((ticket) => {
			const ticketFields = Object.keys(omit(['__typename'], ticket));
			ticketFields.forEach((field) => {
				expect(isTicketField(null, field)).toBe(true);
			});
		});
	});

	it('should return false if field is NOT included in ticket type', () => {
		const inexistingFields = ['blablaField', 'yetAnotherFieldProp'];

		inexistingFields.forEach((field) => {
			expect(isTicketField(null, field)).toBe(false);
		});
	});
});

describe('updateTicketPrice', () => {
	it('should return ticket with updated price based on provided amount', () => {
		[Infinity, -100, 0, 100].forEach((amount) => {
			tickets.forEach((ticket) => {
				const updatedTicket = updateTicketPrice(amount)(ticket);
				expect(updatedTicket.price).toBe(amount);
			});
		});
	});
});

describe('updateReverseCalculate', () => {
	it('should return ticket with updated reverseCalculate based on provided boolean', () => {
		[true, false].forEach((reverseCalculate) => {
			tickets.forEach((ticket) => {
				const updatedTicket = updateReverseCalculate(reverseCalculate)(ticket);
				expect(updatedTicket.reverseCalculate).toBe(reverseCalculate);
			});
		});
	});
});

describe('updateTicketPriceForTicket', () => {
	it('should return tickets with updated price for ticket specified by guid', () => {
		const guid = tickets[0].id;
		const amount = 333;
		const updatedTickets = updateTicketPriceForTicket({ amount, guid, tickets });

		expect(updatedTickets[0].price).toBe(amount);
	});
});

describe('updateTicketReverseCalculate', () => {
	it('should return tickets with updated reverseCalculate being false for ticket specified by guid and by passing reverseCalculate as false value', () => {
		const lastTiecktGuid = last(tickets).id;
		const reverseCalculate = false;
		const updatedTickets = updateTicketReverseCalculate({ guid: lastTiecktGuid, reverseCalculate, tickets });

		expect(last(updatedTickets).reverseCalculate).toBe(reverseCalculate);
	});

	it('should return tickets with updated reverseCalculate being true for ticket specified by guid and by passing reverseCalculate as true value', () => {
		const lastTiecktGuid = last(tickets).id;
		const reverseCalculate = true;
		const updatedTickets = updateTicketReverseCalculate({ guid: lastTiecktGuid, reverseCalculate, tickets });

		expect(last(updatedTickets).reverseCalculate).toBe(reverseCalculate);
	});
});
