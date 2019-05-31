/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { IconButton } from '@wordpress/components';

/**
 * Internal imports
 */
import './style.css';

/**
 * IconMenuItem
 * wrapper for WP IconButton that adds EE styles and defaults
 *
 * @param {number} index
 * @param {string} id
 * @param {string} htmlClass
 * @param {object|string} dashicon
 * @param {string} tooltip
 * @param {string} tooltipPosition
 * @param {Function} onClick
 * @param {number|string} itemCount
 * @param {Object} externalApp
 * @param {Object} otherProps
 * @return {string} rendered IconMenuItem
 */
const IconMenuItem = ( {
	index,
	id,
	tooltip,
	dashicon,
	onClick,
	htmlClass,
	tooltipPosition,
	itemCount,
	externalApp,
	...otherProps
} ) => {
	const btnClass = classNames( {
		[ `ee-icon-menu-item-${ index }` ]: true,
		[ `ee-icon-menu-item-${ htmlClass }` ]: htmlClass,
		'ee-icon-menu-item': true,
		'clickable': true,
	} );
	if ( itemCount !== '' ) {
		itemCount = parseInt( itemCount, 10 );
		const itemCountClass = classNames( {
			'ee-icon-menu-item-count': true,
			'ee-has-items': itemCount > 0,
			'ee-no-items': itemCount < 1,
		} );
		itemCount = (
			<div className={ itemCountClass }>
				{ itemCount > 0 ? itemCount : '?' }
			</div>
		);
	}
	return (
		<div className={ 'ee-icon-menu-item-wrapper' }>
			<IconButton
				{ ...otherProps }
				id={ `ee-icon-menu-item-${ id }` }
				className={ btnClass }
				onClick={ ( event ) => onClick( event ) }
				onKeyPress={ ( event ) => onClick( event ) }
				tooltip={ tooltip }
				labelPosition={ tooltipPosition }
				icon={ dashicon }
			/>
			{ itemCount }
			{ externalApp }
		</div>
	);
};

IconMenuItem.propTypes = {
	index: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	htmlClass: PropTypes.string.isRequired,
	dashicon: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.string,
	] ).isRequired,
	itemCount: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	tooltip: PropTypes.string.isRequired,
	tooltipPosition: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	externalApp: PropTypes.object,
};

IconMenuItem.defaultProps = {
	itemCount: '',
	externalApp: null,
	tooltipPosition: 'top left',
	htmlClass: '',
};

export default IconMenuItem;
