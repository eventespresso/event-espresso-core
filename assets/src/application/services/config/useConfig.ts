import { useContext } from 'react';

import { ConfigDataProps } from './types';
import { ConfigContext } from '../context/ConfigProvider';

const useConfig = (): ConfigDataProps => useContext<ConfigDataProps>(ConfigContext);

export default useConfig;
