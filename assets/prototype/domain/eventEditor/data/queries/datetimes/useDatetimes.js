import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import useStatus from '../../../../../application/services/apollo/status/useStatus';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';

const useDatetimes = () => {
	const options = useDatetimeQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded('datetimes')) {
		return [];
	}
	let data;

	try {
		data = client.readQuery(options);
	} catch (error) {
		console.error('useDatetimes', error);
		data = {};
	}

	return R.pathOr([], ['espressoDatetimes', 'nodes'], data);
};

export default useDatetimes;
