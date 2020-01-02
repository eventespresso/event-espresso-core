import { useApolloClient } from '@apollo/react-hooks';
import { propOr } from 'ramda';
import { GET_TICKET } from './';
import { Ticket } from '../../types';
import { EntityItemProps, ReadQueryOptions } from '../types';

const useTicketItem = ({ id }: EntityItemProps): Ticket => {
	const client = useApolloClient();
	let data: any;
	let ticket: Ticket;

	const queryOptions: ReadQueryOptions = {
		query: GET_TICKET,
		variables: {
			id,
		},
	};

	try {
		data = client.readQuery(queryOptions);
		ticket = propOr<Ticket, string, any>(null, 'ticket', data);
	} catch (error) {
		// may be do something with the error
	}

	return ticket;
};

export default useTicketItem;
