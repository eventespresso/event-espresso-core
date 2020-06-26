import React, { createContext } from 'react';

import { useConfigData, ConfigDataProps } from '../config';
import { CurrentUser, DateTimeFormats } from '../../valueObjects/config';
import { useCurrentUser } from '@dataServices/apollo/queries/currentUser';
import { useGeneralSettings } from '@dataServices/apollo/queries/generalSettings';

const ConfigContext = createContext<ConfigDataProps | null>(null);

const { Provider, Consumer: ConfigConsumer } = ConfigContext;

const ConfigProvider: React.FC = ({ children }) => {
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
