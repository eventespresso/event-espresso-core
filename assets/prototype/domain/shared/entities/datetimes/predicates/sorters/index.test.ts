import { head, last } from 'ramda';

import sorters from './index';
import { nodes as dates } from '../../../../../eventEditor/data/queries/datetimes/test/data';

describe('sorters', () => {
	it('should return dates sorted in default chronological order if no sort prop is provided', () => {
		const result = sorters({ dates });

		expect(result).toBe(true);
	});
});
