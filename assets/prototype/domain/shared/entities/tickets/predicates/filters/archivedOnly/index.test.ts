/**
 * Internal dependencies
 */
import archivedOnly from './index';
import { tickets } from '../../test/data';

test('Should return only archived tickets', () => {
	const filteredTickets = archivedOnly(tickets);

	expect(filteredTickets.length).toBe(0);
});
