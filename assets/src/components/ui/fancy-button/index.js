/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import classNames from 'classnames';

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
 * @param {string} buttonText
 * @param {string} icon
 * @param {Function} onClick
 * @param {string} size
 * @param {string} style
 * @param {string} htmlClass
 * @param {Object} buttonProps
 */
const FancyButton = ( {
	buttonText,
	icon,
	onClick,
	size = 'medium',
	style = 'wp-primary',
	htmlClass = '',
	...buttonProps
} ) => {
	const isWPStyle = style === 'wp-primary' || style === 'wp-default';
	let iconSize = 24;
	let sizeClass = {
		'ee-medium-button': true,
		'ee-tiny-button': size === 'tiny',
		'ee-small-button': size === 'small',
		'ee-big-button': size === 'big',
		'ee-huge-button': size === 'huge',
		'is-small': ( size === 'tiny' || size === 'small' ) && isWPStyle,
		'is-large': ( size === 'big' || size === 'huge' ) && isWPStyle,
	};
	htmlClass = classNames( {
		'ee-fancy-button': true,
		'ee-form-button': true,
		[ htmlClass ] : htmlClass,
		'ee-button-wp': isWPStyle,
		'is-button': isWPStyle,
		'is-default': style === 'wp-default',
		'is-primary': style === 'wp-primary',
		'woosh': style === 'woosh',
		'twotone': style === 'twotone',
		...sizeClass
	} );
	switch ( size ) {
		case 'tiny':
			iconSize = 18;
			break;
		case 'small':
			iconSize = 21;
			break;
		case 'big':
			iconSize = 27;
			break;
		case 'huge':
			iconSize = 30;
			break;
	}
	if ( icon ) {
		icon = (
			<span className="img-wrap">
				<EspressoIcon icon={ icon } size={ iconSize }/>
			</span>
		);
	} else {
		htmlClass += ' ee-noIcon';
	}
	return (
		<Button className={ htmlClass } onClick={ onClick } { ...buttonProps }>
			<span className="text-wrap">{ buttonText }</span>{ icon }
		</Button>
	);
};

export default FancyButton;
