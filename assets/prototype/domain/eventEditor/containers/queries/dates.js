import gql from 'graphql-tag';

export const GET_DATETIME = gql`
	query DateTime($id: ID!) {
		datetime(id: $id) {
			id
			datetimeId
			name
			description
			start
			end
			startDate
			endDate
			startTime
			endTime
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
				start
				end
				startDate
				endDate
				startTime
				endTime
			}
		}
	}
`;

export const GET_TICKETS = gql`
	query GET_TICKETS($where: RootQueryTicketsConnectionWhereArgs) {
		tickets(where: $where) {
			edges {
				node {
					id
					name
					description
					price
				}
			}
		}
	}
`;
