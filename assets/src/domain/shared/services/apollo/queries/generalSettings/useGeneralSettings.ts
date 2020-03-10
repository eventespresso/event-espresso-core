import { GET_GENERAL_SETTINGS } from './';
import { ReadQueryOptions, useCacheQuery } from '@edtrServices/apollo/queries';
import { GeneralSettings, GeneralSettingsData } from '@application/valueObjects/config/types';
/**
 * A custom react hook for retrieving GeneralSettings
 */
const useGeneralSettings = (): GeneralSettings => {
	const options: ReadQueryOptions = {
		query: GET_GENERAL_SETTINGS,
	};
	const { data } = useCacheQuery<GeneralSettingsData>(options);

	return data?.generalSettings;
};

export default useGeneralSettings;
