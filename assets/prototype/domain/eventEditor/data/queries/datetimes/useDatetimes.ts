import { pathOr } from 'ramda';

import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime, DatetimesList } from '../../types';
import useCacheQuery from '../useCacheQuery';

const useDatetimes = (): Array<Datetime> => {
	const options = useDatetimeQueryOptions();
	const { isLoaded } = useStatus();
	const { data } = useCacheQuery<DatetimesList>(options);

	if (!isLoaded(TypeName.datetimes)) {
		return [];
	}

	return pathOr<Array<Datetime>>([], ['espressoDatetimes', 'nodes'], data);
};

export default useDatetimes;
