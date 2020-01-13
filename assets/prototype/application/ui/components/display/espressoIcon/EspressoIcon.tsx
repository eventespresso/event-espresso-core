import React, { createElement } from 'react';
import classNames from 'classnames';

import { SvgPath } from './svgPaths';
import { EspressoIconProps, Icon } from './types';

/**
 * Custom Event Espresso Dashicons
 */
const EspressoIcon: React.FunctionComponent<EspressoIconProps> = ({
	icon,
	svgSize = 20,
	className,
	isPressed,
	...otherProps
}) => {
	let path: string;
	switch (icon) {
		case Icon.CALCULATOR:
			path = SvgPath.CALCULATOR;
			break;

		case Icon.CALENDAR:
			path = SvgPath.CALENDAR;
			break;

		case Icon.REM:
			path = SvgPath.REM;
			break;

		case Icon.ROTATE:
			path = SvgPath.ROTATE;
			break;

		case Icon.SAVE:
			path = SvgPath.SAVE;
			break;
	}

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
