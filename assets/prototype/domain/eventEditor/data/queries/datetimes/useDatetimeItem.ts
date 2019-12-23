import { useApolloClient } from '@apollo/react-hooks';
import { propOr } from 'ramda';
import { GET_DATETIME } from './';
import { Datetime } from '../../types';
import { EntityItemProps, ReadQueryOptions } from '../types';

const useDatetimeItem = ({ id }: EntityItemProps): Datetime => {
	const client = useApolloClient();
	let data: any, datetime: Datetime;

	const queryOptions: ReadQueryOptions = {
		query: GET_DATETIME,
		variables: {
			id,
		},
	};

	try {
		data = client.readQuery(queryOptions);
		datetime = propOr<Datetime, string, any>(null, 'datetime', data);
	} catch (error) {
		// may be do something with the error
	}
	return datetime;
};

export default useDatetimeItem;
