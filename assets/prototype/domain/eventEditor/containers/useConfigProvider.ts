import { useContext } from 'react';
import { pick } from 'ramda';
import { ConfigContext } from '../../../infrastructure/services/contextProviders/ConfigProvider';
import getDateTimeFormat from '../../../application/value-objects/date-time/getDateTimeFormat';

type useConfigProviderProps = {
	dateTimeFormat: boolean;
};

/**
 *
 * useConfigProvider is used to cherry-pick the exact configs we might need from ConfigProvider.
 */

const useConfigProvider = ({ dateTimeFormat }: useConfigProviderProps) => {
	const { dateFormat, timeFormat } = useContext(ConfigContext);
	let config: any = {};

	if (dateTimeFormat) {
		config.dateTimeFormat = getDateTimeFormat({ dateFormat, timeFormat });
	}

	// const configArray = Object.entries(props).reduce((configs, [configName, configBool]) => {
	// 	if (configBool) {
	// 		configs.push(configName);
	// 	}

	// 	return configs;
	// }, []);

	return config;
};

export default useConfigProvider;
