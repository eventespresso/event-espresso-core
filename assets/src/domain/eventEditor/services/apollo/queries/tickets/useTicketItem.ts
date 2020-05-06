import { useMemo } from 'react';

import { GET_TICKET } from '../tickets';
import { Ticket, TicketItem } from '../../types';
import { EntityItemProps } from '../types';
import { useCacheQuery, ReadQueryOptions } from '@dataServices/apollo/queries';

const useTicketItem = ({ id }: EntityItemProps): Ticket => {
	const options: ReadQueryOptions = {
		query: GET_TICKET,
		variables: {
			id,
		},
	};
	const { data } = useCacheQuery<TicketItem>(options);

	return useMemo(() => data?.ticket, [data?.ticket?.cacheId]);
};

export default useTicketItem;
