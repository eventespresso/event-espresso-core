import React from 'react';
import classNames from 'classnames';

import { svgPath } from './svgPaths';
import { IconProps } from './types';

/**
 * Custom Event Espresso Dashicons
 */
const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ className, name, svgSize = 20, ...props }, ref) => {
	const path = svgPath[name];

	if (!path) {
		return null;
	}

	const newClassName = classNames(className, 'dashicon', `dashicons-${name}`, 'espresso-icon');
	const viewBox = props.viewBox || '0 0 20 20';

	return (
		<svg
			role={'img'}
			aria-hidden={true}
			focusable={false}
			xmlns='http://www.w3.org/2000/svg'
			width={svgSize}
			height={svgSize}
			viewBox={viewBox}
			className={newClassName}
			ref={ref}
			{...props}
		>
			<path d={path} />
		</svg>
	);
});

export default Icon;
