import { useContext } from 'react';
import { ConfigContext } from '../../../infrastructure/services/contextProviders/ConfigProvider';

const useConfig = () => useContext(ConfigContext);

export default useConfig;
