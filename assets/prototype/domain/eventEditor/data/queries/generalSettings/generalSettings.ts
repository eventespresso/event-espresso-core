import gql from 'graphql-tag';

export const GET_GENERAL_SETTINGS: any = gql`
	query GET_GENERAL_SETTINGS {
		generalSettings {
			dateFormat
			timeFormat
			timezone
		}
	}
`;
