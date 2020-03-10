import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime, DatetimesList } from '../../types';
import useCacheQuery from '../useCacheQuery';

const useDatetimes = (): Array<Datetime> => {
	const options = useDatetimeQueryOptions();
	const { data } = useCacheQuery<DatetimesList>(options);

	return data?.espressoDatetimes?.nodes || [];
};

export default useDatetimes;
