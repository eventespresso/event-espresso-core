import { useContext } from 'react';
import { pick } from 'ramda';
import { ConfigContext } from '../../../infrastructure/services/contextProviders/ConfigProvider';

type useConfigProviderProps = {
	dateFormat: boolean;
	email: boolean;
	timezone: boolean;
};

/**
 *
 * useConfigProvider is used to cherry-pick the exact configs we might need from ConfigProvider.
 */

const useConfigProvider = (props: useConfigProviderProps) => {
	const config = useContext(ConfigContext);

	const configArray = Object.entries(props).reduce((configs, [configName, configBool]) => {
		if (configBool) {
			configs.push(configName);
		}

		return configs;
	}, []);

	return pick(configArray, config);
};

export default useConfigProvider;
