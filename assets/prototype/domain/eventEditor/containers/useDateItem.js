import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import get from 'lodash/get';

const useDateItem = ({ id }) => {
	const client = useApolloClient();

	const data = client.readQuery({
		query: gql`
			query DateTime($id: ID!) {
				datetime(id: $id) {
					id
					datetimeId
					name
					description
					startDate
					endDate
				}
			}
		`,
		variables: {
			id
		}
	});

	return data.datetime;
};

export default useDateItem;
