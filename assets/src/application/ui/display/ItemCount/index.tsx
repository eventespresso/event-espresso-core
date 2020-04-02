import React from 'react';
import { Badge, Tooltip } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import classNames from 'classnames';
import { getPropsAreEqual } from '@appServices/utilities';

import './style.scss';

interface ItemCountProps extends BadgeProps {
	zeroCountChar?: string | JSX.Element;
	children: React.ReactNode;
}

const ItemCount: React.FC<ItemCountProps> = ({ children, count, title = ' ', zeroCountChar = '!', ...props }) => {
	const className = classNames(props.className, 'ee-item-count', {
		'ee-item-count--has-items': count > 0,
		'ee-item-count--no-items': count === 0,
	});
	const offset = props.offset || [7, 7];
	const value = count > 0 ? count : zeroCountChar;

	const countNode = (
		<Tooltip title={title}>
			<span className='ant-badge-count' style={{ right: `${offset[0]}px`, top: `${offset[1]}px` }}>
				{value}
			</span>
		</Tooltip>
	);

	return (
		<Badge {...props} className={className} count={countNode} offset={offset}>
			{children}
		</Badge>
	);
};

export default React.memo(ItemCount, getPropsAreEqual(['count']));
