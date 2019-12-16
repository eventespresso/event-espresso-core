import { useContext } from 'react';
import { ConfigContext } from '../context/ConfigProvider';

type useConfigReturnType = {
	dateFormat: string;
	timeFormat: string;
	timezone: string;
};

const useConfig = (): useConfigReturnType => useContext(ConfigContext);

export default useConfig;
