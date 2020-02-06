/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';

const upcomingOnly = (dates: Datetime[]): Datetime[] | [] => dates.filter(({ isUpcoming }) => isUpcoming);

export default upcomingOnly;
