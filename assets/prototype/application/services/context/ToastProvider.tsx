/**
 * External imports
 */
import React, { createContext } from 'react';
import { Position, Toaster } from '@blueprintjs/core';

import { ProviderProps } from './types';

const ToastContext = createContext(null);

const toaster = Toaster.create({
	maxToasts: 6,
	position: Position.BOTTOM_RIGHT,
});

const ToastProvider: React.FC<ProviderProps> = (props): JSX.Element => {
	return <ToastContext.Provider value={toaster}>{props.children}</ToastContext.Provider>;
};

export { ToastContext, ToastProvider };
