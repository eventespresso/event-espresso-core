/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const activeOnly = (dates: Datetime[]) => dates.filter(({ isActive }) => isActive);

export default activeOnly;
