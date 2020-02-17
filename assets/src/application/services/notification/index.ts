import uuidv4 from 'uuid/v4';
import { notification as defaultNotification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import error from './error';
export { default as loadingNotification } from './loading';

const notification = (type: 'success' | 'info' | 'warning' | 'error' | 'loading') => ({
	description,
	duration,
	message,
	placement,
}: ArgsProps): void | string => {
	const key = uuidv4();
	const args: ArgsProps = {
		message,
		description,
		duration: duration,
		key,
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
