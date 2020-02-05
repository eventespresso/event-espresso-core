import activeUpcoming from '../activeUpcoming';
import { nodes as dates } from '../../../../../../eventEditor/services/apollo/queries/datetimes/test/data';

describe('activeUpcoming', () => {
	it('Should return an array of dates which are active OR upcoming', () => {
		const filteredDates = activeUpcoming(dates);

		filteredDates.forEach((date) => {
			expect(date.isActive || date.isUpcoming).toBe(true);
		});
	});
});
