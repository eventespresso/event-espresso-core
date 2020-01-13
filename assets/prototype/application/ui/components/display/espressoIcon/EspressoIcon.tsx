import React from 'react';
import classNames from 'classnames';
import { Dashicon } from '@wordpress/components';
import { Path, SVG } from '@wordpress/components/src/primitives';

import ICONS from './constants';
import PATHS from './svgPaths';
import EspressoIconProps from './types';

/**
 * Custom Event Espresso Dashicons
 */
const EspressoIcon: React.FunctionComponent<EspressoIconProps> = ({ icon, svgSize = 20, className, ...otherProps }) => {
	let path: string;
	switch (icon) {
		case ICONS.CALCULATOR:
			path = PATHS.CALCULATOR;
			break;

		case ICONS.CALENDAR:
			path = PATHS.CALENDAR;
			break;

		case ICONS.REM:
			path = PATHS.REM;
			break;

		case ICONS.ROTATE:
			path = PATHS.ROTATE;
			break;

		case ICONS.SAVE:
			path = PATHS.SAVE;
			break;

		default:
			return <Dashicon icon={icon} size={svgSize} className={className} {...otherProps} />;
	}

	if (!path) {
		return null;
	}
	return (
		<SVG
			aria-hidden
			role='img'
			focusable='false'
			className={classNames(className, 'dashicon', `dashicons-${icon}`, 'espresso-icon')}
			xmlns='http://www.w3.org/2000/svg'
			width={svgSize}
			height={svgSize}
			viewBox='0 0 20 20'
			{...otherProps}
		>
			<Path d={path} />
		</SVG>
	);
};

export default EspressoIcon;
