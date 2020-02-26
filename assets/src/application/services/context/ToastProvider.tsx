import React, { createContext } from 'react';

import { ProviderProps } from './types';
import { useToastManager } from '../toaster';

const ToastContext = createContext(null);

const ToastProvider: React.FC<ProviderProps> = (props) => {
	const toaster = useToastManager({
		placement: 'bottomRight',
	});

	return <ToastContext.Provider value={toaster}>{props.children}</ToastContext.Provider>;
};

export { ToastContext, ToastProvider };
