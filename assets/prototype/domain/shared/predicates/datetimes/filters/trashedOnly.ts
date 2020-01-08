/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const trashedOnly = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(({ isDeleted }) => isDeleted);
};

export default trashedOnly;
