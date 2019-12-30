/**
 * External imports
 */
import React, { createContext, useState } from 'react';
import { useConfigData, ConfigDataProps } from '../config';
import { CurrentUser, DateTimeFormats } from '../../valueObjects/config';

import useCurrentUser from '../../../domain/eventEditor/data/queries/currentUser/useCurrentUser';
import useGeneralSettings from '../../../domain/eventEditor/data/queries/generalSettings/useGeneralSettings';

interface Config {
	config: ConfigDataProps;
	setConfig: React.Dispatch<React.SetStateAction<ConfigDataProps>>;
}

export const ConfigContext = createContext<Config | null>(null);

const { Provider } = ConfigContext;

const ConfigProvider = ({ children }) => {
	const ConfigData = useConfigData();
	const currentUser = useCurrentUser();
	const generalSettings = useGeneralSettings();

	const value: ConfigDataProps = {
		...ConfigData,
		currentUser: currentUser && CurrentUser(currentUser),
		dateTimeFormats: generalSettings && DateTimeFormats(generalSettings),
	};

	const [config, setConfig] = useState<ConfigDataProps>(value);
	console.log('%c > ConfigData: ', 'color: Cyan;', config);
	return <Provider value={{ config, setConfig }}>{children}</Provider>;
};

export default ConfigProvider;
