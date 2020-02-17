import React from 'react';
import uuidv4 from 'uuid/v4';
import { Icon, notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

interface LoadingProps extends ArgsProps {
	loading: boolean;
}

const loading = ({ loading, message, placement = 'bottomRight', ...args }: LoadingProps): any => {
	// const icon = <Icon type='loading-3-quarters' />;
	const icon = <Icon type='loading' />;

	const key = uuidv4();
	const notificationArgs = {
		...args,
		key,
		icon,
		message,
		placement,
	};

	const openLoadingNotification = (): void => notification.open(notificationArgs);
	const closeLoadingNotification = (): void => notification.close(key);
	const closeLoadingNotificationByKey = (loadingKey): void => notification.close(loadingKey);

	return {
		closeLoadingNotification,
		closeLoadingNotificationByKey,
		loadingKey: key,
		openLoadingNotification,
	};
};

export default loading;
