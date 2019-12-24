import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime } from '../../types';
import { ReadQueryOptions } from '../types';

const useDatetimes = (): Datetime[] => {
	const options: ReadQueryOptions = useDatetimeQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded(TypeName.datetimes)) {
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
