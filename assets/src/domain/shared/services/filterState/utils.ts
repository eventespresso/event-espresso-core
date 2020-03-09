import { DisplayStartOrEndDate } from './types';
import { Cell } from '@appLayout/espressoTable';

export const filterCellByStartOrEndDate = (displayStartOrEndDate: DisplayStartOrEndDate) => (cell: Cell): Cell => {
	if (displayStartOrEndDate === DisplayStartOrEndDate.start && cell.key === 'end') {
		return null;
	}

	if (displayStartOrEndDate === DisplayStartOrEndDate.end && cell.key === 'start') {
		return null;
	}

	return cell;
};
