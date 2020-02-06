import { compareAsc, compareDesc } from 'date-fns';

type SortProps = {
	dates: Date[];
	order: 'asc' | 'desc';
};

const sort = ({ dates, order }: SortProps): Date[] => {
	return order === 'asc' ? dates.sort(compareAsc) : dates.sort(compareDesc);
};

export default sort;
