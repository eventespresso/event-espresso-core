import React from 'react';
import classNames from 'classnames';

import { svgPath } from './svgPaths';
import { EspressoIconProps } from './types';

/**
 * Custom Event Espresso Dashicons
 */
const EspressoIcon = React.forwardRef<SVGSVGElement, EspressoIconProps>(
	({ name, svgSize = 20, className, ...otherProps }, ref) => {
		const path = svgPath[name];

		if (!path) {
			return null;
		}

		const htmlClass = classNames(className, 'dashicon', `dashicons-${name}`, 'espresso-icon');

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
				ref={ref}
				{...otherProps}
			>
				<path d={path} />
			</svg>
		);
	}
);

export default EspressoIcon;
