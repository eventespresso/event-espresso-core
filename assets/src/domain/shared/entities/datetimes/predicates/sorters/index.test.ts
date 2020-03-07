import { compareAsc, parseISO } from 'date-fns';

import sorters from './index';
import { nodes as dates } from '@edtrServices/apollo/queries/datetimes/test/data';

describe('sorters', () => {
	it('should return dates sorted in default chronological order if no sortBy prop is provided', () => {
		const sortedDates = sorters({ dates });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = compareAsc(parseISO(currentDatetime.startDate), parseISO(nextDatetime.startDate));
				expect(result).toBe(-1);
			}
		});
	});

	it('should return dates sorted in chronological order if sortBy prop is set to `date`', () => {
		const sortedDates = sorters({ dates, sortBy: 'date' });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = compareAsc(parseISO(currentDatetime.startDate), parseISO(nextDatetime.startDate));
				expect(result).toBe(-1);
			}
		});
	});

	it('should return dates sorted by Id if sortBy prop is set to `id`', () => {
		const sortedDates = sorters({ dates, sortBy: 'id' });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = currentDatetime.id < nextDatetime.id;
				expect(result).toBe(-1);
			}
		});
	});

	it('should return dates sorted by name if sortBy prop is set to `name`', () => {
		const sortedDates = sorters({ dates, sortBy: 'name' });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = currentDatetime.name < nextDatetime.name;
				expect(result).toBe(true);
			}
		});
	});

	it('should return dates sorted by order if sortBy prop is set to `order`', () => {
		const sortedDates = sorters({ dates, sortBy: 'order' });
		sortedDates.forEach((currentDatetime, index) => {
			const nextDatetime = sortedDates.length <= index + 1 ? sortedDates[index + 1] : null;
			if (nextDatetime) {
				const result = currentDatetime.order < nextDatetime.order;
				expect(result).toBe(true);
			}
		});
	});
});
