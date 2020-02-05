/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';
import { isTrashed } from '../../../../../services/predicates';

const trashedOnly = (dates: Datetime[]): Datetime[] | [] => {
	return dates.filter(isTrashed);
};

export default trashedOnly;
