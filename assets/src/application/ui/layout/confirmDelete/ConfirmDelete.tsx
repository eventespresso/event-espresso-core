import React from 'react';
import { Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { __ } from '@wordpress/i18n';

interface ConfirmDeleteProps extends Omit<PopconfirmProps, 'title'> {
	title?: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ children, ...props }) => {
	const title = props.title || __('Are you sure you want to delete this?');

	return (
		<Popconfirm {...props} cancelText={__('No')} okText={__('Yes')} title={title}>
			{children}
		</Popconfirm>
	);
};

export default ConfirmDelete;
