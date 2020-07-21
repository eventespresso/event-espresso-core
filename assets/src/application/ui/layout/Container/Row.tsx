import React from 'react';
import ConditionalElement from './ConditionalElement';
import classNames from 'classnames';
import type { RowProps } from './types';
import './styles.scss';

/**
 * A container with horizontally aligned child components
 */
const Row: React.FC<RowProps> = ({
	align = 'start',
	as = 'section',
	children,
	className,
	reverse = false,
	...props
}) => {
	const htmlClass = classNames(
		className,
		'ee-container',
		align && `ee-container--align-${align}`,
		reverse && 'ee-container--inline-reverse',
		!reverse && 'ee-container--inline'
	);
	return (
		<ConditionalElement {...props} className={htmlClass} tag={as}>
			{children}
		</ConditionalElement>
	);
};

export default Row;
