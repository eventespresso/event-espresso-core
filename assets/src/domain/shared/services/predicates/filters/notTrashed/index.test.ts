import notTrashed from './index';
import datetimes from '../../../../entities/datetimes/predicates/filters/tests/data';
import { tickets } from '../../../../entities/tickets/predicates/test/data';

test('Should return array of untrashed datetimes', () => {
	const noTrash = notTrashed(datetimes);
	expect(noTrash.length).toBe(5);
	datetimes[0].isTrashed = true;
	const trashed = notTrashed(datetimes);
	expect(trashed.length).toBe(4);
});

test('Should return array of untrashed tickets', () => {
	const noTrash = notTrashed(tickets);
	expect(noTrash.length).toBe(5);
	tickets[0].isTrashed = true;
	const trashed = notTrashed(tickets);
	expect(trashed.length).toBe(4);
});
