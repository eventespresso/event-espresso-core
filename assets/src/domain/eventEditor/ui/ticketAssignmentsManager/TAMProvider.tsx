/**
 * External imports
 */
import React, { createContext } from 'react';

import useTAMStateManager from './useTAMStateManager';
import { TAMStateManager } from './types';
import { ProviderProps } from '@appServices/context/types';

const TAMContext = createContext<TAMStateManager | null>(null);

const { Provider, Consumer: TAMConsumer } = TAMContext;

const TAMProvider: React.FC<ProviderProps> = ({ children }) => {
	const tam = useTAMStateManager();
	return <Provider value={tam}>{children}</Provider>;
};

export { TAMContext, TAMProvider, TAMConsumer };
