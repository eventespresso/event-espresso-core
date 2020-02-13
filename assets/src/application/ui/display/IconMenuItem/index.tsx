import React from 'react';
import { Badge, Icon } from 'antd';
import { BadgeProps } from 'antd/lib/badge';

import './style.scss';

interface IconMenuItemProps extends BadgeProps {
	children?: React.ReactNode;
	id?: string;
	showClock?: boolean;
}

const IconMenuItem = ({ children, showClock, ...props }: IconMenuItemProps) => {
	const count = showClock ? <Icon type='clock-circle' style={{ color: '#f5222d' }} /> : props.count;
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
