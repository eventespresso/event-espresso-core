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

export { default as useFetchGeneralSettings } from './useFetchGeneralSettings';

export { default as useGeneralSettings } from './useGeneralSettings';

export { default as useUpdateGeneralSettingsCache } from './useUpdateGeneralSettingsCache';
