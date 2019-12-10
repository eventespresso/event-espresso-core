import { useApolloClient } from '@apollo/react-hooks';
import { propOr } from 'ramda';
import { GET_TICKET } from './tickets';

const useTicketItem = ({ id }) => {
	const client = useApolloClient();
	let data;

	try {
		data = client.readQuery({
			query: GET_TICKET,
			variables: {
				id,
			},
		});
	} catch (error) {
		data = {};
	}

	return propOr({}, 'ticket', data);
};

export default useTicketItem;
