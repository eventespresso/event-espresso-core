import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime, DatetimeEdge } from '../../types';
import { useDatetimesQuery } from '@dataServices/apollo/queries';

const useDatetimes = (): Array<Datetime> => {
	const options = useDatetimeQueryOptions();

	return useDatetimesQuery<DatetimeEdge>(options);
};

export default useDatetimes;
