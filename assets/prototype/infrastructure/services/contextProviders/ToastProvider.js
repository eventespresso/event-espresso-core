/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import { Position, Toaster } from '@blueprintjs/core';

const ToastContext = createContext();

const toaster = Toaster.create({
	maxToasts: 6,
	position: Position.BOTTOM_RIGHT,
});

const ToastProvider = (props) => {
	return <ToastContext.Provider value={toaster}>{props.children}</ToastContext.Provider>;
};

export { ToastContext, ToastProvider };
