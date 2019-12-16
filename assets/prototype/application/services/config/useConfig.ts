import { useContext } from 'react';
import { ConfigContext } from '../context/ConfigProvider';

<<<<<<< HEAD
type ConfigReturnType = {
=======
type useConfigReturnType = {
>>>>>>> Created useZonedTime; js_only.
	dateFormat: string;
	timeFormat: string;
	timezone: string;
};

<<<<<<< HEAD
const useConfig = (): ConfigReturnType => useContext(ConfigContext);
=======
const useConfig = (): useConfigReturnType => useContext(ConfigContext);
>>>>>>> Created useZonedTime; js_only.

export default useConfig;
