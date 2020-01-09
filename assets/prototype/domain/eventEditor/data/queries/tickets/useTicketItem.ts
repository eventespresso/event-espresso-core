import { useApolloClient } from '@apollo/react-hooks';
import { propOr } from 'ramda';
import { GET_TICKET } from './';
import { Ticket } from '../../types';
import { EntityItemProps, ReadQueryOptions } from '../types';

type TicketItemData = {
	ticket: Ticket;
};

const useTicketItem = ({ id }: EntityItemProps): Ticket => {
	const client = useApolloClient();
	let data: TicketItemData;
	let ticket: Ticket;

	const queryOptions: ReadQueryOptions = {
		query: GET_TICKET,
		variables: {
			id,
		},
	};

	try {
		data = client.readQuery<TicketItemData>(queryOptions);
		ticket = propOr<Ticket, TicketItemData, Ticket>(null, 'ticket', data);
	} catch (error) {
		// may be do something with the error
	}

	return ticket;
};

export default useTicketItem;
