import { useApolloClient } from '@apollo/react-hooks';
import { GET_DATETIME } from './queries/dates';

const useDateItem = ({ id }) => {
	const client = useApolloClient();

	const data = client.readQuery({
		query: GET_DATETIME,
		variables: {
			id
		}
	});

	return data.datetime;
};

export default useDateItem;
