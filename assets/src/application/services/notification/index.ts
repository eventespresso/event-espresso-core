import { notification as defaultNotification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import error from './error';

const getHash = (message): string => {
	const msg = JSON.stringify(message);
	return msg
		.split('')
		.reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0)
		.toString();
};

const notification = (type: 'success' | 'info' | 'warning' | 'error') => ({
	description,
	duration,
	message,
	placement,
}: ArgsProps): void => {
	const hash = getHash(message);
	const args: ArgsProps = {
		message,
		description,
		duration: duration,
		key: hash,
		placement: placement || 'bottomRight',
	};

	setTimeout(() => {
		if (type === 'error') {
			return error(args);
		}

		defaultNotification[type](args);
	}, 0);
};

export const errorNotification = notification('error');
export const infoNotification = notification('info');
export const successNotification = notification('success');

export default notification;
