import { compareAsc, parseISO } from 'date-fns';

import sorters from './index';
import { DatesSorted } from '../../../../../eventEditor/data/date/types';
import { nodes as dates } from '../../../../../eventEditor/data/queries/datetimes/test/data';

describe('sorters', () => {
	it('should return dates sorted in default chronological order if no sort prop is provided', () => {
		const sortedDates = sorters({ dates });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = compareAsc(parseISO(currentDatetime.startDate), parseISO(nextDatetime.startDate));
				expect(result).toBe(-1);
			}
		});
	});

	it('should return dates sorted in chronological order if sort prop is set to `chronologically`', () => {
		const sortedDates = sorters({ dates, order: DatesSorted.chronologically });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = compareAsc(parseISO(currentDatetime.startDate), parseISO(nextDatetime.startDate));
				expect(result).toBe(-1);
			}
		});
	});

	it('should return dates sorted by Id if sort prop is set to `byId`', () => {
		const sortedDates = sorters({ dates, order: DatesSorted.byId });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = currentDatetime.id < nextDatetime.id;
				expect(result).toBe(-1);
			}
		});
	});

	it('should return dates sorted by name if sort prop is set to `byName`', () => {
		const sortedDates = sorters({ dates, order: DatesSorted.byName });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = currentDatetime.name < nextDatetime.name;
				expect(result).toBe(true);
			}
		});
	});

	it('should return dates sorted by order if sort prop is set to `byOrder`', () => {
		const sortedDates = sorters({ dates, order: DatesSorted.byOrder });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = currentDatetime.order < nextDatetime.order;
				expect(result).toBe(true);
			}
		});
	});
});
