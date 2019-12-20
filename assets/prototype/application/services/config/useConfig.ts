import { useContext } from 'react';

import { ConfigDataProps } from './ConfigData';
import { ConfigContext } from '../context/ConfigProvider';

export const useConfig = (): ConfigDataProps => useContext(ConfigContext);
