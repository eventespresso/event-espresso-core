import React from 'react';
import classNames from 'classnames';

import { Badge, BadgeProps, Tooltip } from '@infraUI/display';
import { getPropsAreEqual } from '@appServices/utilities';

import './style.scss';

interface ItemCountProps extends BadgeProps {
	children: React.ReactNode;
	/** Number to show in badge */
	count?: React.ReactNode;
	emphasizeZero?: boolean;
	offset?: [number | string, number | string];
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
	const offset = props.offset || [8, -4];
	const value = count === 0 && typeof zeroCountChar !== 'undefined' ? zeroCountChar : count;
	const countNode = (
		<Tooltip placement='top' tooltip={ title }>
			<span>{ value }</span>
		</Tooltip>
	);

	return (
		<div className='ee-item-count__wrapper'>
			<Badge { ...props } className={ className } style={ { right: `${offset[0]}px`, top: `${offset[1]}px` } }>
				{ countNode }
			</Badge>
			{ children }
		</div>
	);
};

export default React.memo(ItemCount, getPropsAreEqual(['count']));
