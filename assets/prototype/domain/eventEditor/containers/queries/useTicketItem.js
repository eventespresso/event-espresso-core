import { useApolloClient } from '@apollo/react-hooks';
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

	console.log('%c > data: ', 'color: cyan;', data);

	return data.ticket || {};
};

export default useTicketItem;
