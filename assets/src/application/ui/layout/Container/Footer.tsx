import React from 'react';
import ConditionalElement from './ConditionalElement';
import classNames from 'classnames';
import type { FooterProps } from './types';
import './styles.scss';

/**
 * A container for displaying child elements
 * typically after other elements within a Stack
 */
const Footer: React.FC<FooterProps> = ({ align = 'wide', as = 'footer', children, className, ...props }) => {
	const htmlClass = classNames(className, 'ee-container__footer', align && `ee-container--align-${align}`);
	return (
		<ConditionalElement {...props} className={htmlClass} tag={as}>
			{children}
		</ConditionalElement>
	);
};

export default Footer;
