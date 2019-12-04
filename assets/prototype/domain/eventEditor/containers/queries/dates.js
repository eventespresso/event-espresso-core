import gql from 'graphql-tag';

export const GET_DATETIME = gql`
	query DateTime($id: ID!) {
		datetime(id: $id) {
			id
			dbId
			description
			endDate
			name
			startDate
		}
	}
`;

export const GET_DATETIMES = gql`
	query GET_DATETIMES($where: RootQueryDatetimesConnectionWhereArgs) {
		datetimes(where: $where) {
			nodes {
				id
				dbId
				description
				endDate
				name
				startDate
			}
		}
	}
`;
