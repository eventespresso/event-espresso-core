/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const upcomingOnly = (dates: Datetime[]): Datetime[] | [] => dates.filter(({ isUpcoming }) => isUpcoming);

export default upcomingOnly;
