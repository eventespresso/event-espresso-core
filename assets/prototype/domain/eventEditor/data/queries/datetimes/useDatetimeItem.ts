import { useApolloClient } from '@apollo/react-hooks';
import { propOr } from 'ramda';
import { GET_DATETIME } from './';
import { Datetime } from '../../types';
import { EntityItemProps, ReadQueryOptions } from '../types';

type DatetimeItemData = {
	datetime: Datetime;
};

const useDatetimeItem = ({ id }: EntityItemProps): Datetime => {
	const client = useApolloClient();

	let data: DatetimeItemData, datetime: Datetime;

	const queryOptions: ReadQueryOptions = {
		query: GET_DATETIME,
		variables: {
			id,
		},
	};

	try {
		data = client.readQuery<DatetimeItemData>(queryOptions);
		datetime = propOr<Datetime, DatetimeItemData, Datetime>(null, 'datetime', data);
	} catch (error) {
		// may be do something with the error
	}
	return datetime;
};

export default useDatetimeItem;
