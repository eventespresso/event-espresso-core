import React from 'react';
import classNames from 'classnames';

import { svgPath } from './svgPaths';
import { EspressoIconProps } from './types';

/**
 * Custom Event Espresso Dashicons
 */
const EspressoIcon: React.FC<EspressoIconProps> = ({ icon, svgSize = 20, className, isPressed, ...otherProps }) => {
	let path: string;

	path = svgPath[icon];

	if (!path) {
		return null;
	}

	const htmlClass = classNames(className, 'dashicon', `dashicons-${icon}`, 'espresso-icon');

	return (
		<svg
			role={'img'}
			aria-hidden={true}
			focusable={false}
			xmlns='http://www.w3.org/2000/svg'
			width={svgSize}
			height={svgSize}
			viewBox='0 0 20 20'
			className={htmlClass}
			{...otherProps}
		>
			<path d={path} />
		</svg>
	);
};

export default EspressoIcon;
