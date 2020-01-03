/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const activeOnly = (dates: Datetime[]): Datetime[] | [] => dates.filter(({ isActive }) => isActive);

export default activeOnly;
