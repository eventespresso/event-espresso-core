import { useContext } from 'react';

import { ConfigDataProps } from './types';
import { ConfigContext } from '../context/ConfigProvider';

export const useConfig = (): ConfigDataProps => useContext<ConfigDataProps>(ConfigContext);
