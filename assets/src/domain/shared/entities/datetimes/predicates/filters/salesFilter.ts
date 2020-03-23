import { Datetime } from '@edtrServices/apollo';
import { DatetimeSales } from '@edtrServices/filterState';

import aboveCapacity from './aboveCapacity';
import allDates from './allDates';
import belowCapacity from './belowCapacity';
import notTrashed from '../../../../services/predicates/filters/notTrashed';

import { SalesFilter } from './types';

/**
 * reduces dates array based on value of the "sales" filter
 */
const salesFilter = ({ dates: entities, sales = DatetimeSales.all }: SalesFilter): Datetime[] => {
	const dates = notTrashed(entities);
	switch (sales) {
		case DatetimeSales.above50Capacity:
			return aboveCapacity({ dates, capacity: 50 });
		case DatetimeSales.above75Capacity:
			return aboveCapacity({ dates, capacity: 75 });
		case DatetimeSales.above90Capacity:
			return aboveCapacity({ dates, capacity: 90 });
		case DatetimeSales.all:
			return allDates(dates);
		case DatetimeSales.below50Capacity:
			return belowCapacity({ dates, capacity: 50 });
		default:
			return dates;
	}
};

export default salesFilter;
