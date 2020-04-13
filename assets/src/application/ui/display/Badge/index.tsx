import React from 'react';
import classNames from 'classnames';
import { Badge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';

import { Tooltip } from '@infraUI/display';

import './style.scss';

interface ItemCountProps extends BadgeProps {
	children: React.ReactNode;
	emphasizeZero?: boolean;
	zeroCountChar?: string | JSX.Element;
}

const Badge: React.FC<ItemCountProps> = ({ children, count, emphasizeZero, title = ' ', zeroCountChar, ...props }) => {
	const className = classNames(props.className, 'ee-item-count', {
		'ee-item-count--has-items': count > 0,
		'ee-item-count--no-items': count === 0 && emphasizeZero,
	});
	const offset = props.offset || [7, 7];
	const value = count === 0 && typeof zeroCountChar !== 'undefined' ? zeroCountChar : count;

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

export default React.memo(Badge);
