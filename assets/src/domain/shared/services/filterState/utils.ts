import { DisplayStartOrEndDate } from './types';
import { Cell } from '@appLayout/espressoTable';

export const filterCellByStartOrEndDate = (displayStartOrEndDate: DisplayStartOrEndDate) => (cell: Cell): boolean => {
	if (displayStartOrEndDate === DisplayStartOrEndDate.start && cell.key === 'end') {
		return false;
	}

	if (displayStartOrEndDate === DisplayStartOrEndDate.end && cell.key === 'start') {
		return false;
	}

	return true;
};
