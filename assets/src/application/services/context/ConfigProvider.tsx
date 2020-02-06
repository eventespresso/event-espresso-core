/**
 * External imports
 */
import React, { createContext, useState } from 'react';
import { useConfigData, ConfigDataProps, Config } from '../config';
import { CurrentUser, DateTimeFormats } from '../../valueObjects/config';
import { ProviderProps } from './types';
import { useCurrentUser, useGeneralSettings } from '../../../domain/shared/services/apollo/queries';

const ConfigContext = createContext<Config | null>(null);

const { Provider, Consumer: ConfigConsumer } = ConfigContext;

const ConfigProvider: React.FC<ProviderProps> = ({ children }) => {
	const ConfigData = useConfigData();
	const currentUser = useCurrentUser();
	const generalSettings = useGeneralSettings();

	const value: ConfigDataProps = {
		...ConfigData,
		currentUser: currentUser && CurrentUser(currentUser),
		dateTimeFormats: generalSettings && DateTimeFormats(generalSettings),
	};

	const [config, setConfig] = useState<ConfigDataProps>(value);
	return <Provider value={{ config, setConfig }}>{children}</Provider>;
};

export { ConfigProvider, ConfigConsumer, ConfigContext };
