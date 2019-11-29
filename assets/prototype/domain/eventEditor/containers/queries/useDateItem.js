import { useApolloClient } from '@apollo/react-hooks';
import { GET_DATETIME } from './dates';

const useDateItem = ({ id }) => {
	const client = useApolloClient();
	let data;

	try {
		data = client.readQuery({
			query: GET_DATETIME,
			variables: {
				id,
			},
		});
	} catch (error) {
		data = {};
	}

	return data.datetime || {};
};

export default useDateItem;
