import React from 'react';
import ConditionalElement from './ConditionalElement';
import classNames from 'classnames';
import type { ContentProps } from './types';
import './styles.scss';

/**
 * A container for displaying the main content for a section
 * typically between other elements within a Stack or Row
 */
const Content: React.FC<ContentProps> = ({ align = 'start', as = 'div', children, className, ...props }) => {
	const htmlClass = classNames(className, 'ee-container__section', align && `ee-container--align-${align}`);
	return (
		<ConditionalElement {...props} className={htmlClass} tag={as}>
			{children}
		</ConditionalElement>
	);
};

export default Content;
