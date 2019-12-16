import { useContext } from 'react';
import { ConfigContext } from '../context/ConfigProvider';

type ConfigReturnType = {
	dateFormat: string;
	timeFormat: string;
	timezone: string;
};

const useConfig = (): ConfigReturnType => useContext(ConfigContext);

export default useConfig;
