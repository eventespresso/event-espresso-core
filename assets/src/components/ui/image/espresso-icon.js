/**
 * External dependencies
 */
import { Component } from 'react';
import { Path, SVG } from '@wordpress/components';

/**
 * Custom Event Espresso Dashicons
 *
 * @constructor
 * @param {string} icon
 * @param {number} size
 * @param {string} className
 */
export class EspressoIcon extends Component {
	render() {
		const { icon, size = 20, className, ...otherProps } = this.props;
		let path;

		switch ( icon ) {
			case 'calculator':
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
			case 'calendar':
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
					`${ className } dashicon dashicons-${ icon } espresso-icon`
				}
				xmlns="http://www.w3.org/2000/svg"
				width={ size }
				height={ size }
				viewBox="0 0 20 20"
				{ ...otherProps }
			>
				<Path d={ path }/>
			</SVG>
		);
	}
}