import React from 'react';
import { Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { __ } from '@wordpress/i18n';

const ConfirmDelete: React.FC<Partial<PopconfirmProps>> = ({ children, ...props }) => {
	return (
		<Popconfirm title={__('Are you sure delete it?')} okText={__('Yes')} cancelText={__('No')} {...props}>
			{children}
		</Popconfirm>
	);
};

export default ConfirmDelete;
