import React from 'react';
import classNames from 'classnames';

import ConditionalElement from './ConditionalElement';
import type { StackProps } from './types';
import './styles.scss';

/**
 * A container with vertically aligned child components
 */
const Stack: React.FC<StackProps> = ({ align = 'top', as = 'section', children, className, ...props }) => {
	const htmlClass = classNames(
		className,
		'ee-container',
		'ee-container--vertical',
		align && `ee-container--align-${align}`
	);
	return (
		<ConditionalElement {...props} className={htmlClass} tag={as}>
			{children}
		</ConditionalElement>
	);
};

export default Stack;
