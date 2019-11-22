import gql from 'graphql-tag';

export const GET_DATETIME = gql`
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
`;

export const GET_DATETIMES = gql`
	query GET_DATETIMES($where: RootQueryDatetimesConnectionWhereArgs) {
		datetimes(where: $where) {
			nodes {
				id
				datetimeId
				name
				description
				startDate
				endDate
			}
		}
	}
`;
