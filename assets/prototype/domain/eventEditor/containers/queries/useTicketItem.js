import { useApolloClient } from '@apollo/react-hooks';
import { GET_TICKET } from './tickets';

const useTicketItem = ({ id }) => {
	const client = useApolloClient();

	const data = client.readQuery({
		query: GET_TICKET,
		variables: {
			id,
		},
	});
	console.log('%c > data: ', 'color: cyan;', data);

	return data.ticket;
};

export default useTicketItem;
