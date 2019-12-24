/**
 * External imports
 */
import propOr from 'ramda/src/propOr';
import { useQuery } from '@apollo/react-hooks';
import { createContext } from 'react';

import { ConfigData, ConfigDataProps } from '../config';
import { CurrentUser, CurrentUserProps, DateTimeFormats } from '../../valueObjects/config';

// import useToaster from '../../../application/services/toaster/useToaster';
import { GET_CURRENT_USER } from '../../../domain/eventEditor/data/queries/currentUser/currentUser';
import { GET_GENERAL_SETTINGS } from '../../../domain/eventEditor/data/queries/generalSettings/generalSettings';

export const ConfigContext = createContext<ConfigDataProps | null>(null);

const { Provider } = ConfigContext;

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

	const currentUser = propOr<CurrentUserProps, string, any>(null, 'viewer', currentUserData);
	const generalSettings = propOr<any, string, any>({}, 'generalSettings', generalSettingsData);

	const value = {
		...ConfigData,
		currentUser: CurrentUser(currentUser),
		dateTimeFormats: DateTimeFormats(generalSettings),
	};
	console.log('%c > ConfigData: ', 'color: Cyan;', value);
	return <Provider value={value}>{children}</Provider>;
};

export default ConfigProvider;
