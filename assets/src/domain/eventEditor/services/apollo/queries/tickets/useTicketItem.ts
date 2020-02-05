import { pathOr } from 'ramda';
import { GET_TICKET } from '../tickets';
import { Ticket, TicketItem } from '../../types';
import { EntityItemProps, ReadQueryOptions } from '../types';
import useCacheQuery from '../useCacheQuery';

const useTicketItem = ({ id }: EntityItemProps): Ticket => {
	const options: ReadQueryOptions = {
		query: GET_TICKET,
		variables: {
			id,
		},
	};
	const { data } = useCacheQuery<TicketItem>(options);

	return pathOr<Ticket>(null, ['ticket'], data);
};

export default useTicketItem;
