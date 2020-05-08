import gql from 'graphql-tag';

export const EVENT_ATTRIBUTES: any = gql`
	fragment eventAttributes on EspressoEvent {
		id
		dbId
		description
		name
		isActive
		isCancelled
		isExpired
		isInactive
		isPostponed
		isSoldOut
		isUpcoming
		order
		shortDescription
	}
`;

export const GET_EVENT: any = gql`
	query GET_EVENT($id: ID!) {
		espressoEvent(id: $id, idType: DATABASE_ID) {
			...eventAttributes
		}
	}
	${EVENT_ATTRIBUTES}
`;
