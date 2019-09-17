/**
 * External imports
 */
import { __DEV__ } from '@eventespresso/eejs';

const { console } = window;

/**
 * utility for blocking click events
 * and displaying debug data in dev environments
 *
 * @function
 * @param {Object} click - DOM click event
 * @param {string} source - where click originated
 */
const cancelClickEvent = ( click, source = '' ) => {
	if ( click && typeof click.preventDefault === 'function' ) {
		click.preventDefault();
		click.stopPropagation();
		if ( __DEV__ && source !== '' ) {
			console.log(
				'%c >> CLICK <<',
				'font-size: 13px; color: yellow;',
				source,
				click
			);
		}
	}
};

export default cancelClickEvent;
