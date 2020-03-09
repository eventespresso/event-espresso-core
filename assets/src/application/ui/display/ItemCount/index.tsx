import React from 'react';
import { Badge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import classNames from 'classnames';

import './style.scss';

interface ItemCountProps extends BadgeProps {
	id?: string;
	showClock?: boolean;
}

const ItemCount: React.FC<ItemCountProps> = ({ children, count, ...props }) => {
	const className = classNames(props.className, 'ee-item-count', {
		'ee-item-count--has-items': count > 0,
		'ee-item-count--no-items': count === 0,
	});
	const offset = props.offset || [-5, 5];

	return (
		<Badge {...props} className={className} count={count} offset={offset} showZero>
			{children}
		</Badge>
	);
};

export default ItemCount;
