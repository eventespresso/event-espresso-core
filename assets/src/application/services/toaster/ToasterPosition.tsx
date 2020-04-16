import React from 'react';
import getToasterPositionStyle from './utilities/getToasterPositionStyle';
import Toast from './Toast';
import { ToasterPositionProps } from './types';

/**
 * adapted from:
 * @link https://github.com/bmcmahen/toasted-notes/blob/master/src/Alert/ToastManager.ts
 */
const ToasterPosition: React.FC<ToasterPositionProps> = ({ position, toasts }) => {
	const style = getToasterPositionStyle(position);
	return (
		<span key={position} className={'ee-toaster__position--' + position} style={style}>
			{toasts.map((toast) => {
				return <Toast key={toast.key} position={position} {...toast} />;
			})}
		</span>
	);
};
export default ToasterPosition;
