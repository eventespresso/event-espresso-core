/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';

const upcomingOnly = (dates: Datetime[]) => dates.filter(({ isUpcoming }) => isUpcoming);

export default upcomingOnly;
