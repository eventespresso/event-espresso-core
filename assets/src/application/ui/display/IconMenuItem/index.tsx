import React from 'react';
import { Badge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import { ClockCircleOutlined } from '@ant-design/icons';

import './style.scss';

interface IconMenuItemProps extends BadgeProps {
	children?: React.ReactNode;
	id?: string;
	showClock?: boolean;
}

const IconMenuItem = ({ children, showClock, ...props }: IconMenuItemProps) => {
	const count = showClock ? <ClockCircleOutlined style={{ color: '#f5222d' }} /> : props.count;
	const id = props.id ? `ee-icon-menu-item-${props.id}` : 'ee-icon-menu-item';

	return (
		<div className={'ee-icon-menu-item-wrapper'} id={id}>
			<Badge {...props} count={count}>
				{children}
			</Badge>
		</div>
	);
};

export default IconMenuItem;
