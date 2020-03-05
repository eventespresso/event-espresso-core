import React from 'react';
import { Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { __ } from '@wordpress/i18n';

interface ConfirmDeleteProps extends Omit<PopconfirmProps, 'title'> {
	message?: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ children, message, ...props }) => {
	const title = message || __('Are you sure you want to delete this?');
	return (
		<Popconfirm title={title} okText={__('Yes')} cancelText={__('No')} {...props}>
			{children}
		</Popconfirm>
	);
};

export default ConfirmDelete;
