/**
 * Internal dependencies
 */
import trashedOnly from './index';
import { tickets } from '../../test/data';

test('Should return only trashed tickets', () => {
	const filteredTickets = trashedOnly(tickets);

	expect(filteredTickets.length).toBe(0);
});
