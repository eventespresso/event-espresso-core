import gql from 'graphql-tag';

export const GET_RELATIONS_DATA = gql`
	query getEventRelationalData($eventId: Int!) {
		eventRelations(eventId: $eventId)
	}
`;
