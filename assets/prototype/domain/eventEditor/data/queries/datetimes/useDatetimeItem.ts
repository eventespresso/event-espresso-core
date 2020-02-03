import { pathOr } from 'ramda';
import { GET_DATETIME } from './';
import { Datetime, DatetimeItem } from '../../types';
import { EntityItemProps, ReadQueryOptions } from '../types';
import useCacheQuery from '../useCacheQuery';

const useDatetimeItem = ({ id }: EntityItemProps): Datetime => {
	const options: ReadQueryOptions = {
		query: GET_DATETIME,
		variables: {
			id,
		},
	};
	const { data } = useCacheQuery<DatetimeItem>(options);

	return pathOr<Datetime>(null, ['datetime'], data);
};

export default useDatetimeItem;
