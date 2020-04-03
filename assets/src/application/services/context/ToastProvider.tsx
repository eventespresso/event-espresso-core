import React, { createContext } from 'react';

import { useToastManager } from '../toaster';

const ToastContext = createContext(null);

const ToastProvider: React.FC = (props) => {
	const toaster = useToastManager({
		placement: 'bottomRight',
	});

	return <ToastContext.Provider value={toaster}>{props.children}</ToastContext.Provider>;
};

export { ToastContext, ToastProvider };
