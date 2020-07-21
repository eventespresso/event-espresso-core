import React from 'react';
import ConditionalElement from './ConditionalElement';
import classNames from 'classnames';
import type { SidebarProps } from './types';
import './styles.scss';

/**
 * A container for displaying child elements
 * before or after other elements within a Row
 */
const Sidebar: React.FC<SidebarProps> = ({
	align = 'top',
	as = 'aside',
	before = false,
	children,
	className,
	...props
}) => {
	const htmlClass = classNames(
		className,
		'ee-container__sidebar',
		align && `ee-container--align-${align}`,
		before && 'ee-container__sidebar--before',
		!before && 'ee-container__sidebar--after'
	);
	return (
		<ConditionalElement {...props} className={htmlClass} tag={as}>
			{children}
		</ConditionalElement>
	);
};

export default Sidebar;
