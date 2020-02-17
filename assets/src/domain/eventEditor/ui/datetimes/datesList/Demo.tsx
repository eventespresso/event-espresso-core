import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import { loadingNotification, warningNotification } from '@appServices/notification';

const Demo: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const {
		closeLoadingNotification,
		closeLoadingNotificationByKey,
		loadingKey,
		openLoadingNotification,
	} = loadingNotification({
		loading,
		message: 'bla bla',
	});

	warningNotification({ message: 'warning set on render' });

	return (
		<div>
			<Button type='primary' onClick={openLoadingNotification}>
				Open
			</Button>
			<Button type='danger' onClick={closeLoadingNotification}>
				Close
			</Button>
			<Button type='danger' onClick={() => closeLoadingNotificationByKey(loadingKey)}>
				Close by key
			</Button>
			<Button type='dashed' onClick={() => warningNotification({ message: 'warn' })}>
				Warn
			</Button>
		</div>
	);
};

export default Demo;
