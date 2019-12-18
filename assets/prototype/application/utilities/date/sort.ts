import { compareAsc, compareDesc } from 'date-fns';

type SortProps = {
	dates: Date[];
	order: 'asc' | 'desc';
};

const sort = ({ dates, order }: SortProps) => {
	if (order === 'asc') {
		return dates.sort(compareAsc);
	}

	if (order === 'desc') {
		return dates.sort(compareDesc);
	}
};

export default sort;
