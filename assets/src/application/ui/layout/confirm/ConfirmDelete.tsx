import React from 'react';
import { Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { RenderFunction } from 'antd/lib/_util/getRenderPropValue';
import { __ } from '@wordpress/i18n';

interface ConfirmDeleteProps extends Omit<PopconfirmProps, 'title'> {
	title?: React.ReactNode | RenderFunction;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ children, ...props }) => {
	const cancelText = props.cancelText || __('No');
	const okText = props.okText || __('Yes');
	const title = props.title || __('Are you sure you want to delete this?');

	return (
		<Popconfirm {...props} cancelText={cancelText} okText={okText} title={title}>
			{children}
		</Popconfirm>
	);
};

export default ConfirmDelete;
