import { useContext } from 'react';

import { Config } from './types';
import { ConfigContext } from '../context/ConfigProvider';

export const useConfig = (): Config => useContext<Config>(ConfigContext);
