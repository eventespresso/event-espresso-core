import gql from 'graphql-tag';

export const DATETIME_ATTRIBUTES = gql`
	fragment datetimeAttributes on Datetime {
		id
		dbId
		description
		endDate
		name
		startDate
	}
`;

export const GET_DATETIME = gql`
	query DateTime($id: ID!) {
		datetime(id: $id) {
			...datetimeAttributes
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const GET_DATETIMES = gql`
	query GET_DATETIMES($where: RootQueryDatetimesConnectionWhereArgs) {
		datetimes(where: $where) {
			nodes {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;
