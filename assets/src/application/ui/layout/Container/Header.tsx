import React from 'react';
import ConditionalElement from './ConditionalElement';
import classNames from 'classnames';
import type { HeaderProps } from './types';
import './styles.scss';

/**
 * A container for displaying child elements
 * typically above other elements within a Stack
 */
const Header: React.FC<HeaderProps> = ({ align = 'wide', as = 'header', children, className, ...props }) => {
	const htmlClass = classNames(className, 'ee-container__header', align && `ee-container--align-${align}`);
	return (
		<ConditionalElement {...props} className={htmlClass} tag={as}>
			{children}
		</ConditionalElement>
	);
};

export default Header;
