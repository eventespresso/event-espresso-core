import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import {
	errorNotification,
	infoNotification,
	successNotification,
	warningNotification,
} from '@appServices/notification';

const Demo: React.FC = () => {
	return (
		<div>
			<Button type='primary' onClick={() => infoNotification({ message: 'info' })}>
				info
			</Button>

			<Button type='dashed' onClick={() => successNotification({ message: 'success' })}>
				success
			</Button>

			<Button type='danger' onClick={() => errorNotification({ message: 'error' })}>
				error
			</Button>

			<Button type='dashed' onClick={() => warningNotification({ message: 'warn' })}>
				Warn
			</Button>
		</div>
	);
};

export default Demo;
