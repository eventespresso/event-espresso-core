import React from 'react';
import { Popconfirm } from 'antd';
import { __ } from '@wordpress/i18n';

import { ConfirmProps } from './types';

const ConfirmClose: React.FC<ConfirmProps> = ({ children, ...props }) => {
	const cancelText = props.cancelText || __('No');
	const okText = props.okText || __('Yes');
	const title = props.title || __('Are you sure you want to close this?');

	return (
		<Popconfirm {...props} cancelText={cancelText} okText={okText} title={title}>
			{children}
		</Popconfirm>
	);
};

export default ConfirmClose;
