import { useContext } from 'react';
import { ConfigContext } from '../../../infrastructure/services/contextProviders/ConfigProvider';
import getDateTimeFormat from '../../../application/valueObjects/dateTime/getDateTimeFormat';

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
		const dateTimeFormat = getDateTimeFormat({ dateFormat, timeFormat });
		config = { ...config, ...dateTimeFormat };
	}

	return config;
};

export default useConfigProvider;
