import { useContext } from 'react';
import { ConfigContext } from '../context/ConfigProvider';

const useConfig = () => useContext(ConfigContext);

export default useConfig;
