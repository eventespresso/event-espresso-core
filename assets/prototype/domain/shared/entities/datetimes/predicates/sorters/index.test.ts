import { head, last } from 'ramda';
import { compareAsc, parseISO } from 'date-fns';

import sorters from './index';
import { DatesSortedBy } from '../../../../../eventEditor/data/date/types';
import { nodes as dates } from '../../../../../eventEditor/data/queries/datetimes/test/data';

describe('sorters', () => {
	it('should return dates sorted in default chronological order if no sort prop is provided', () => {
		const sortedDates = sorters({ dates });
		const firstDate = head(sortedDates);
		const lastDate = last(sortedDates);
		/**
		 * Compare the two dates and return 1 if the first date is after the second,
		 * -1 if the first date is before the second or 0 if dates are equal.
		 * description from: https://date-fns.org/v2.9.0/docs/compareAsc
		 */
		const result = compareAsc(parseISO(firstDate.startDate), parseISO(lastDate.startDate));

		expect(result).toBe(-1);
	});

	it('should return dates sorted in chronological order if sort prop is set to `chronologically`', () => {
		const sortedDates = sorters({ dates, sort: DatesSortedBy.chronologically });
		const firstDate = head(sortedDates);
		const lastDate = last(sortedDates);
		const result = compareAsc(parseISO(firstDate.startDate), parseISO(lastDate.startDate));

		expect(result).toBe(-1);
	});

	it('should return dates sorted by Id if sort prop is set to `byId`', () => {
		const sortedDates = sorters({ dates, sort: DatesSortedBy.byId });
		const firstDate = head(sortedDates);
		const lastDate = last(sortedDates);
		const result = firstDate.id < lastDate.id;

		expect(result).toBe(true);
	});

	it('should return dates sorted by name if sort prop is set to `byName`', () => {
		const sortedDates = sorters({ dates, sort: DatesSortedBy.byName });
		const firstDate = head(sortedDates);
		const lastDate = last(sortedDates);
		const result = firstDate.name < lastDate.name;

		expect(result).toBe(true);
	});

	it('should return dates sorted by order if sort prop is set to `byOrder`', () => {
		const sortedDates = sorters({ dates, sort: DatesSortedBy.byOrder });
		const firstDate = head(sortedDates);
		const lastDate = last(sortedDates);
		const result = firstDate.order < lastDate.order;

		expect(result).toBe(true);
	});
});
