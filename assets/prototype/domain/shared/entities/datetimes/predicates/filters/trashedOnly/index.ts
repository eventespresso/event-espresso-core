/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';
import isTrashed from '../../isTrashed';

const trashedOnly = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(isTrashed);
};

export default trashedOnly;
