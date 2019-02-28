/**
 * External dependencies
 */
import { Button, Dashicon } from '@wordpress/components';

/**
 * Internal imports
 */
import './style.css';
import { EspressoIcon } from '../';

/**
 * FancyButton
 *  WP Button wrapper for adding styles
 *
 * @class
 * @param {string} label
 * @param {string} icon
 * @param {Function} onClick
 * @param {string} size
 * @param {string} style
 */
const FancyButton = ( {
	label,
	icon,
	onClick,
	size = 'medium',
	style = 'wp-primary',
} ) => {
	let iconSize = 24;
	let sizeClass = 'ee-medium-button';
	let htmlClass = 'ee-fancy-button';
	switch ( size ) {
		case 'tiny':
			iconSize = 18;
			sizeClass = style === 'wp-primary' || style === 'wp-default' ?
				'is-small ee-tiny-button' :
				'ee-tiny-button';
			break;
		case 'small':
			iconSize = 21;
			sizeClass = style === 'wp-primary' || style === 'wp-default' ?
				'is-small ee-small-button' :
				'ee-small-button';
			break;
		case 'big':
			iconSize = 27;
			sizeClass = style === 'wp-primary' || style === 'wp-default' ?
				'is-large ee-big-button' :
				'ee-big-button';
			break;
		case 'huge':
			iconSize = 30;
			sizeClass = style === 'wp-primary' || style === 'wp-default' ?
				'is-large ee-huge-button' :
				'ee-huge-button';
			break;
	}
	switch ( style ) {
		case 'wp-default':
			htmlClass = 'ee-button-wp is-button is-default';
			break;
		case 'wp-primary':
			htmlClass = 'ee-button-wp is-button is-primary';
			break;
		case 'woosh':
			htmlClass = 'ee-button-woosh';
			break;
		case 'twotone':
			htmlClass = 'ee-button-twotone';
			break;
	}
	htmlClass += ' ' + sizeClass;
	icon = icon === 'calendar' || icon === 'calculator' ?
		<EspressoIcon icon={ icon } size={ iconSize }/> :
		<Dashicon icon={ icon } size={ iconSize }/>
	return (
		<Button className={ htmlClass } onClick={ onClick }>
			<span className="text-wrap">{ label }</span>
			<span className="img-wrap">{ icon }</span>
		</Button>
	);
};

export default FancyButton;
