import { useQuery } from '@apollo/react-hooks';

import { useSystemNotifications } from '@appServices/toaster';
import { GET_GENERAL_SETTINGS } from './';
import { FetchQueryResult } from '@dataServices/apollo/queries/types';
import { GeneralSettingsData } from '@application/valueObjects/config/types';

const useFetchGeneralSettings = (): FetchQueryResult<GeneralSettingsData> => {
	const toaster = useSystemNotifications();

	const { data, error, loading } = useQuery<GeneralSettingsData>(GET_GENERAL_SETTINGS, {
		// only display error, not loading or success
		onError: (error): void => {
			toaster.error({ message: error.message });
		},
	});

	return {
		data,
		error,
		loading,
	};
};

export default useFetchGeneralSettings;
