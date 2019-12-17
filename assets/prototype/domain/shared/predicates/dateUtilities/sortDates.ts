import { compareAsc, compareDesc } from 'date-fns';

type DatesAreEqualType = {
	dates: Date[];
	order: 'asc' | 'desc';
};

const sortDates = ({ dates, order }: DatesAreEqualType) => {
	if (order === 'asc') {
		return dates.sort(compareAsc);
	}

	if (order === 'desc') {
		return dates.sort(compareDesc);
	}
};

export default sortDates;
