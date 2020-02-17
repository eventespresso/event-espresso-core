import React from 'react';
import uuidv4 from 'uuid/v4';
import { Icon, notification as defaultNotification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import error from './error';

const notification = (type: 'success' | 'info' | 'warning' | 'error' | 'loading') => ({
	description,
	duration,
	message,
	placement,
}: ArgsProps): void => {
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
		if (type === 'loading') {
			// const icon = <Icon type='loading-3-quarters' />;
			defaultNotification.open({
				...args,
				//  icon
			});
		}

		defaultNotification[type](args);
	}, 0);
};

export const errorNotification = notification('error');
export const infoNotification = notification('info');
export const successNotification = notification('success');

export default notification;
