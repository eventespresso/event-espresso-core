/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Dashicon, Path, SVG } from '@wordpress/components';

export const ESPRESSO_ICON_CALCULATOR = 'calculator';
export const ESPRESSO_ICON_CALENDAR = 'calendar';
export const ESPRESSO_ICON_REM = 'recurring-date';
export const ESPRESSO_ICON_SAVE = 'save';

/**
 * @function
 * @param {string} icon
 * @return {boolean} true if icon is an EspressoIcon
 */
export const isEspressoIcon = ( icon ) => {
	switch ( icon ) {
		case ESPRESSO_ICON_CALCULATOR:
		case ESPRESSO_ICON_CALENDAR:
		case ESPRESSO_ICON_SAVE:
			return true;
		default:
			return false;
	}
};

/**
 * Custom Event Espresso Dashicons
 *
 * @function
 * @param {string} icon
 * @param {number} svgSize
 * @param {string} className
 * @param {Object} otherProps
 */
const EspressoIcon = ( {
	icon,
	src = '',
	svgSize = 20,
	className,
	...otherProps
} ) => {
	console.log( '%c ' + src + ' > icon: ', 'color: #BCBDAC;', icon, svgSize );
	let path;
	switch ( icon ) {

		case ESPRESSO_ICON_CALCULATOR:
			path = 'M 3 0 v20 h14 v-20 h-14 z ' +
				'm 2.5 2.5 h9 v2 h-9 v-2 z ' +
				'm 0 4 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ' +
				'M 5.5 9.5 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ' +
				'M 5.5 12.5 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ' +
				'M 5.5 15.5 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ' +
				'm 3.5 0 h2 v1.75 h-2 v-1.75 z ';
			break;

		case ESPRESSO_ICON_CALENDAR:
			path = 'M 0 2 v18 h20 v-18 z ' +
				'M 2 6.5 h16 v11.5 h-16 z ' +
				'M 15.5 0 V8 h-1.38 L11.54 10.06 l .8 1.2 .92 -.74 c .12' +
				' -.1 .32 -.28 .6 -.56 l -.04 .84 V16.5 H15.5 z ' +
				'M 9.5 10 ' +
				'c 0 -.6 -.24 -1.08 -.74 -1.42 -.48 -.34 -1.16 -.52 -2' +
				' -.52 -1.04 0 -1.92 .26 -2.66 .8 ' +
				'l .8 1.2  ' +
				'c .34 -.22 .64 -.38 .92 -.46 .28 -.1 .54 -.14 .82 -.14' +
				' .76 0 1.16 .3 1.16 .92 0 .4 -.14 .7 -.44 .86  ' +
				's -.76 .24 -1.4 .24 ' +
				'h -.62 ' +
				'v 1.32 ' +
				'h .62 ' +
				'c .68 0 1.18 .08 1.5 .24 .3 .16 .46 .44 .46 .82 0 .44' +
				' -.14 .74 -.4 .94 -.28 .2 -.7 .3 -1.26 .3 -.38 0 -.76' +
				' -.06 -1.14 -.16 ' +
				's -.72 -.24 -1.04 -.4 ' +
				'v 1.48 ' +
				'c .68 .3 1.48 .44 2.36 .44 1.06 0 1.88 -.22 2.44 -.66' +
				' .58 -.44 .86 -1.04 .86 -1.84 0 -.54 -.18 -.96 -.52 -1.28 ' +
				's -.84 -.52 -1.48 -.6 ' +
				'v -.04 ' +
				'c .54 -.12 .98 -.38 1.3 -.74 .3 -.36 .46 -.78 .46 -1.3 z ' +
				'M 4 0 h2 v2 h-2 v-2 z ' +
				'M 14 0 h2 v2 h-2 v-2 z';
			break;

		case 'image-rotate':
			path = 'M 10.25 1.02 ' +
				'c 5.1 0 8.75 4.04 8.75 9 ' +
				's -3.65 9-8.75 9 ' +
				'c -3.2 0-6.02-1.59-7.68-3.99 ' +
				'l 2.59-1.52 ' +
				'c 1.1 1.5 2.86 2.51 4.84 2.51 3.3 0 6-2.79 6-6 ' +
				's-2.7-6-6-6 ' +
				'c-1.97 0-3.72 1-4.82 2.49 ' +
				'L 7 8.02 ' +
				'l -6 2 ' +
				'v -7 ' +
				'L 2.89 4.6 ' +
				'c 1.69-2.17 4.36-3.58 7.36-3.58z';
			break;

		case ESPRESSO_ICON_REM:
			path = 'M 10 1.02 ' +
				'c -5.1 0 -8.75 4.04 -8.75 9 ' +
				's 3.65 9 8.75 9 ' +
				'c 3.2 0 6.02 -1.59 7.68 -3.99 ' +
				'l -2.59 -1.52 ' +
				'c -1.1 1.5 -2.86 2.51 -4.84 2.51 -3.3 0 -6 -2.79 -6 -6 ' +
				's 2.7 -6 6 -6 ' +
				'c 1.97 0 3.72 1 4.82 2.49 ' +
				'L 13.15 8.15 ' +
				'l 6.18 1.09 ' +
				'v -6.25 ' +
				'L 17.4 4.6 ' +
				'c -1.69 -2.17 -4.36 -3.58 -7.36 -3.58 z';
			break;

		case ESPRESSO_ICON_SAVE:
			path = 'M 1 17.5 v -16 l 0.5 -0.5 h 14.5 l 3 3 v 14.5 ' +
				'l -0.5 0.5 h -17 l -0.5 -0.5 z M 5 7 h 9 l 0.5 -0.5 ' +
				'v -4.5 h -9 v 4.5 l 0.5 0.5 z M 11 6.5 v -3.5 h 2 ' +
				'v 3 h -2 z M 4 11.5 v 0.5 h 12 v -0.5 z m 0 2 v 0.5 ' +
				'h 12 v -0.5 z m 0 2 v 0.5 h 12 v -0.5 z';
			break;

		default:
			return (
				<Dashicon
					icon={ icon }
					size={ svgSize }
					className={ className }
					{ ...otherProps }
				/>
			);
	}

	if ( ! path ) {
		return null;
	}
	return (
		<SVG
			aria-hidden
			role="img"
			focusable="false"
			className={
				classNames(
					className,
					'dashicon',
					`dashicons-${ icon }`,
					'espresso-icon'
				)
			}
			xmlns="http://www.w3.org/2000/svg"
			width={ svgSize }
			height={ svgSize }
			viewBox="0 0 20 20"
			{ ...otherProps }
		>
			<Path d={ path }/>
		</SVG>
	);
};



EspressoIcon.propTypes = {
	icon: PropTypes.string.isRequired,
	svgSize: PropTypes.number,
	className: PropTypes.string,
};

EspressoIcon.defaultProps = {
	svgSize: 20,
	className: '',
};

export default EspressoIcon;