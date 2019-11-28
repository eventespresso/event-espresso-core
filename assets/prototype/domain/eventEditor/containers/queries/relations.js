import gql from 'graphql-tag';

export const GET_RELATIONS_DATA = gql`
	query getEvetRelationalData($eventId: Int!) {
		eventRelations(eventId: $eventId)
	}
`;
