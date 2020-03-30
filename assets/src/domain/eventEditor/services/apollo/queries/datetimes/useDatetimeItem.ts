import { useMemo } from 'react';
import { GET_DATETIME } from '../datetimes';
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

	return useMemo(() => data?.datetime, [data?.datetime?.cacheId]);
};

export default useDatetimeItem;
