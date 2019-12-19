/**
 * External imports
 */
import propOr from 'ramda/src/propOr';
import { useQuery } from '@apollo/react-hooks';
import { createContext } from 'react';

import { ConfigData } from '../config/ConfigData';
import { CurrentUser, DateTimeFormats } from '../../valueObjects/config';

// import useToaster from '../../../application/services/toaster/useToaster';
import { GET_CURRENT_USER } from '../../../domain/eventEditor/data/queries/currentUser/currentUser';
import { GET_GENERAL_SETTINGS } from '../../../domain/eventEditor/data/queries/generalSettings/generalSettings';

export const ConfigContext = createContext(ConfigData);

const ConfigProvider = ({ children }) => {
	// const toaster = useToaster();
	const { data: currentUserData, error: currentUserError, loading: currentUserLoading } = useQuery(GET_CURRENT_USER);
	// if (currentUserError) {
	// 	toaster.error(currentUserError);
	// }

	const { data: generalSettingsData, error: generalSettingsError, loading: generalSettingsLoading } = useQuery(
		GET_GENERAL_SETTINGS
	);
	// if (generalSettingsError) {
	// 	toaster.error(generalSettingsError);
	// }

	const currentUserProps = propOr({}, 'viewer', currentUserData);
	const generalSettings = propOr({}, 'generalSettings', generalSettingsData);

	const value = {
		...ConfigData,
		currentUser: CurrentUser(currentUserProps),
		dateTimeFormats: DateTimeFormats(generalSettings),
	};

	console.log('%c > config: ', 'color: Cyan;', config);
	return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
