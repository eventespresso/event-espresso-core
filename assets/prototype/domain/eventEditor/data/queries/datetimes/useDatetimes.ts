import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime, DatetimesList } from '../../types';
import { ReadQueryOptions } from '../types';

const useDatetimes = (): Datetime[] => {
	const options: ReadQueryOptions = useDatetimeQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded(TypeName.datetimes)) {
		return [];
	}
	let data: DatetimesList;

	try {
		data = client.readQuery<DatetimesList>(options);
	} catch (error) {
		data = null;
	}

	return R.pathOr<Datetime[]>([], ['espressoDatetimes', 'nodes'], data);
};

export default useDatetimes;
