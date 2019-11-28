import gql from 'graphql-tag';

export const GET_DATETIME = gql`
	query DateTime($id: ID!) {
		datetime(id: $id) {
			id
			datetimeId
			description
			endDate
			endTime
			name
			startDate
			startTime
		}
	}
`;

export const GET_DATETIMES = gql`
	query GET_DATETIMES($where: RootQueryDatetimesConnectionWhereArgs) {
		datetimes(where: $where) {
			nodes {
				id
				datetimeId
				description
				endDate
				endTime
				name
				startDate
				startTime
			}
		}
	}
`;
