import React, { createContext } from 'react';
import { useConfigData, ConfigDataProps } from '../config';
import { CurrentUser, DateTimeFormats } from '../../valueObjects/config';
import { ProviderProps } from './types';
import { useCurrentUser, useGeneralSettings } from '../../../domain/shared/services/apollo/queries';

const ConfigContext = createContext<ConfigDataProps | null>(null);

const { Provider, Consumer: ConfigConsumer } = ConfigContext;

const ConfigProvider: React.FC<ProviderProps> = ({ children }) => {
	const ConfigData = useConfigData();
	const currentUser = useCurrentUser();
	const generalSettings = useGeneralSettings();

	const config: ConfigDataProps = {
		...ConfigData,
		currentUser: currentUser && CurrentUser(currentUser),
		dateTimeFormats: generalSettings && DateTimeFormats(generalSettings),
	};

	return <Provider value={config}>{children}</Provider>;
};

export { ConfigProvider, ConfigConsumer, ConfigContext };
