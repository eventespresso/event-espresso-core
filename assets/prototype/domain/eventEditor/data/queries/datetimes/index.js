import gql from 'graphql-tag';

export const DATETIME_ATTRIBUTES = gql`
	fragment datetimeAttributes on EspressoDatetime {
		id
		dbId
		capacity
		description
		endDate
		isActive
		isExpired
		isPrimary
		isSoldOut
		isUpcoming
		length
		name
		order
		reserved
		sold
		startDate
	}
`;

export const GET_DATETIME = gql`
	query GET_DATETIME($id: ID!) {
		datetime(id: $id) {
			...datetimeAttributes
		}
	}
	${DATETIME_ATTRIBUTES}
`;

export const GET_DATETIMES = gql`
	query GET_DATETIMES($where: EspressoRootQueryDatetimesConnectionWhereArgs) {
		espressoDatetimes(where: $where) {
			nodes {
				...datetimeAttributes
			}
		}
	}
	${DATETIME_ATTRIBUTES}
`;
