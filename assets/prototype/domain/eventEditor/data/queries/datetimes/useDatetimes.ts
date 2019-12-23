import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import useStatus from '../../../../../application/services/apollo/status/useStatus';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime } from '../../types';
import { ReadQueryOptions } from '../types';

const useDatetimes = (): Datetime[] => {
	const options: ReadQueryOptions = useDatetimeQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded('datetimes')) {
		return [];
	}
	let data: any;

	try {
		data = client.readQuery(options);
	} catch (error) {
		data = {};
	}

	return R.pathOr([], ['espressoDatetimes', 'nodes'], data);
};

export default useDatetimes;
