import notTrashed from './index';
import datetimes from '../../../../entities/datetimes/predicates/filters/tests/data';
import { tickets } from '../../../../entities/tickets/predicates/test/data';

test('Should return array of untrashed datetimes', () => {
	const noTrash = notTrashed(datetimes);
	expect(noTrash.length).toBe(datetimes.length);
	datetimes[0].isTrashed = true;
	const trashed = notTrashed(datetimes);
	expect(trashed.length).toBe(datetimes.length - 1);
});

test('Should return array of untrashed tickets', () => {
	const noTrash = notTrashed(tickets);
	expect(noTrash.length).toBe(tickets.length);
	tickets[0].isTrashed = true;
	const trashed = notTrashed(tickets);
	expect(trashed.length).toBe(tickets.length - 1);
});
