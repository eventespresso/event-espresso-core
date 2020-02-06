import { useContext } from 'react';

import { Config } from './types';
import { ConfigContext } from '../context/ConfigProvider';

const useConfig = (): Config => useContext<Config>(ConfigContext);

export default useConfig;
