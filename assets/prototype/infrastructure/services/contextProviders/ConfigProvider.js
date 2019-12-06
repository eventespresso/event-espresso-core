/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import { pick, propOr } from 'ramda';
import { useQuery } from '@apollo/react-hooks';

import { GET_GENERAL_SETTINGS } from '../../../domain/eventEditor/containers/queries/generalSettings';
import { GET_CURRENT_USER } from '../../../domain/eventEditor/containers/queries/currentUser';

export const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
	const {
		data: generalSettingsData,
		error: generalSettingsDataError,
		loading: generalSettingsDataLoading,
	} = useQuery(GET_GENERAL_SETTINGS);

	/**
	 * To be updated according to this implementation https://github.com/eventespresso/event-espresso-core/pull/1974
	 */
	console.log('ConfigProvider', { error, loading });

	const generalSettings = propOr({}, 'generalSettings', generalSettingsData);
	const value = pick(['dateFormat', 'timezone'], generalSettings);

	return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
