import React from 'react';
import classNames from 'classnames';
import { BadgeProps } from 'antd/lib/badge';

import { Badge, Tooltip } from '@infraUI/display';

import { getPropsAreEqual } from '@appServices/utilities';

import './style.scss';

interface ItemCountProps extends BadgeProps {
	children: React.ReactNode;
	emphasizeZero?: boolean;
	zeroCountChar?: string | JSX.Element;
}

const ItemCount: React.FC<ItemCountProps> = ({
	children,
	count,
	emphasizeZero = true,
	title = ' ',
	zeroCountChar,
	...props
}) => {
	const className = classNames(props.className, 'ee-item-count', {
		'ee-item-count--has-items': count > 0,
		'ee-item-count--no-items': count === 0 && emphasizeZero,
	});
	const offset = props.offset || [7, 7];
	const value = count === 0 && typeof zeroCountChar !== 'undefined' ? zeroCountChar : count;
	const countNode = (
		<Tooltip placement='top' title={title}>
			<span>{value}</span>
		</Tooltip>
	);

	return (
		<div className='ee-item-count__wrapper'>
			<Badge {...props} className={className} style={{ right: `${offset[0]}px`, top: `${offset[1]}px` }}>
				{countNode}
			</Badge>
			{children}
		</div>
	);
};

export default React.memo(ItemCount, getPropsAreEqual(['count']));
