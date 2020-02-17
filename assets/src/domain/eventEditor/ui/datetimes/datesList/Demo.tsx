import React, { useState } from 'react';
import { Button } from 'antd';

import { loadingNotification } from '@appServices/notification';

const Demo: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const { closeLoadingNotification, loadingKey, openLoadingNotification } = loadingNotification({
		loading,
		message: 'bla bla',
	});

	return (
		<div>
			<Button type='primary' onClick={openLoadingNotification}>
				Open
			</Button>
			<Button type='danger' onClick={closeLoadingNotification}>
				Close
			</Button>
			<Button type='dashed'>Dashed</Button>
			<Button type='link'>Link</Button>
		</div>
	);
};

export default Demo;
