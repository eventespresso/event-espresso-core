import { Datetime } from '../../../../eventEditor/data/types';

import capacityAtOrAbove from '../capacityAtOrAbove';

type AboveCapacityProps = {
	capacity: number;
	dates: Datetime[];
};

const aboveCapacity = ({ capacity, dates }: AboveCapacityProps) => {
	const filterFn = (date) => !date.isDeleted && capacityAtOrAbove(date, capacity);

	return dates.filter(filterFn);
};

export default aboveCapacity;
