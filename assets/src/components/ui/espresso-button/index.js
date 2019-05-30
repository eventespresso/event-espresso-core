/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import './style.css';
import { EspressoIcon } from '../';

/**
 * EspressoButton
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
const EspressoButton = ( {
	buttonText,
	icon,
	onClick,
	size,
	style,
	htmlClass,
	...buttonProps
} ) => {
	htmlClass = classNames( {
		[ htmlClass ] : htmlClass,
		'esprs-button': true,
		'esprs-btn-accent': style === 'accent',
		'esprs-btn-default': style === 'default',
		'esprs-btn-primary': style === 'primary',
		'esprs-btn-secondary': style === 'secondary',
		'esprs-btn-tiny': size === 'tiny',
		'esprs-btn-small': size === 'small',
		'esprs-btn-big': size === 'big',
		'esprs-btn-huge': size === 'huge',
	} );
	let iconSize = 24;
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
		<button { ...buttonProps } className={ htmlClass } onClick={ onClick }>
			<span className="text-wrap">{ buttonText }</span>{ icon }
		</button>
	);
};

EspressoButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.string,
	size: PropTypes.string,
	style: PropTypes.string,
	htmlClass: PropTypes.string,
};

EspressoButton.defaultProps = {
	icon: '',
	size: 'default',
	style: 'default',
	htmlClass: '',
};

export default EspressoButton;
