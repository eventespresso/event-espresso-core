import { prepareEntitiesForUpdate, ticketsWithNewQuantity } from './';
import { nodes as allDates } from '@edtrServices/apollo/queries/datetimes/test/data';
import { nodes as allTickets } from '@edtrServices/apollo/queries/tickets/test/data';
import { relationalData as existingData } from '@edtrServices/context/TestContext/data';
import { assocPath, pathOr } from 'ramda';

describe('TAM:ticketsWithNewQuantity', () => {
	it('returns an empty object when existing relational data is empty', () => {
		const ticketsToUpdate = prepareEntitiesForUpdate({
			entity: 'tickets',
			existingData: {},
			newData: {},
			relation: 'datetimes',
		});

		const ticketsWithChangedQuantity = ticketsWithNewQuantity({
			allDates,
			allTickets,
			existingData,
			ticketsToUpdate,
		});

		expect(ticketsWithChangedQuantity).toEqual({});
	});

	it('returns an empty object when new relational data is empty', () => {
		const ticketsToUpdate = prepareEntitiesForUpdate({
			entity: 'tickets',
			existingData,
			newData: {},
			relation: 'datetimes',
		});

		const ticketsWithChangedQuantity = ticketsWithNewQuantity({
			allDates,
			allTickets,
			existingData,
			ticketsToUpdate,
		});

		expect(ticketsWithChangedQuantity).toEqual({});
	});

	it('returns an empty object when assignment is only removed', () => {
		// lets modify existing data to create new one
		const path = ['tickets', allTickets[0].id, 'datetimes'];
		// ticket at allTickets[0] is related to two dates
		// lets assign the ticket to only one date and remove others
		const newData = assocPath(path, [allDates[1].id], existingData);

		const ticketsToUpdate = prepareEntitiesForUpdate({
			entity: 'tickets',
			existingData,
			newData,
			relation: 'datetimes',
		});

		const ticketsWithChangedQuantity = ticketsWithNewQuantity({
			allDates,
			allTickets,
			existingData,
			ticketsToUpdate,
		});

		expect(ticketsWithChangedQuantity).toEqual({});
	});

	it('returns an empty object when newly assigned date and ticket have equal capacity and quantity respectively', () => {
		// lets modify existing data to create new one
		const path = ['tickets', allTickets[0].id, 'datetimes']; // ticket at index 0 has quantity 100
		const existingRelatedDates = pathOr([], path, existingData);

		// lets assign a date to the first ticket
		const newData = assocPath(path, [...existingRelatedDates, allDates[1].id], existingData); // date at index 1 has capacity 100

		const ticketsToUpdate = prepareEntitiesForUpdate({
			entity: 'tickets',
			existingData,
			newData,
			relation: 'datetimes',
		});

		const ticketsWithChangedQuantity = ticketsWithNewQuantity({
			allDates,
			allTickets,
			existingData,
			ticketsToUpdate,
		});

		expect(ticketsWithChangedQuantity).toEqual({});
	});

	it('does not add the ticket to changed map if the assigned date capacity is higher than ticket quantity', () => {
		const path = ['tickets', allTickets[0].id, 'datetimes']; // ticket at index 0 has quantity 100
		const existingRelatedDates = pathOr([], path, existingData);
		// lets assign the date to the ticket
		const newData = assocPath(path, [...existingRelatedDates, allDates[2].id], existingData); // date at index 2 has capacity 420

		const ticketsToUpdate = prepareEntitiesForUpdate({
			entity: 'tickets',
			existingData,
			newData,
			relation: 'datetimes',
		});

		const ticketsWithChangedQuantity = ticketsWithNewQuantity({
			allDates,
			allTickets,
			existingData,
			ticketsToUpdate,
		});

		// do not expect the ticket id to exist in changed quantity map
		expect(ticketsWithChangedQuantity).not.toHaveProperty(allTickets[0].id);
	});

	it('returns an object with new quantities when a date with lower capacity than ticket quantity is assigned', () => {
		// lets modify existing data to create new one
		const path = ['tickets', allTickets[1].id, 'datetimes']; // ticket at index 1 has quantity -1 (infinite)
		const existingRelatedDates = pathOr([], path, existingData);
		// lets assign a date to the first ticket
		const newData = assocPath(path, [...existingRelatedDates, allDates[2].id], existingData); // date at index 2 has capacity 420

		const ticketsToUpdate = prepareEntitiesForUpdate({
			entity: 'tickets',
			existingData,
			newData,
			relation: 'datetimes',
		});

		const ticketsWithChangedQuantity = ticketsWithNewQuantity({
			allDates,
			allTickets,
			existingData,
			ticketsToUpdate,
		});

		// expect the ticket id to exist in changed quantity map
		expect(ticketsWithChangedQuantity).toHaveProperty(allTickets[1].id);

		const newTicketQuantity = ticketsWithChangedQuantity[allTickets[1].id];
		const dateCapacity = allDates[2].capacity;

		expect(newTicketQuantity).toEqual(dateCapacity);
	});
});
