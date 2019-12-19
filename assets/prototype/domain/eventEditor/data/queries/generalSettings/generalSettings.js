import gql from 'graphql-tag';

export const GET_GENERAL_SETTINGS = gql`
	query GET_GENERAL_SETTINGS {
		generalSettings {
			dateFormat
			timeFormat
			timezone
		}
	}
`;
