/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { DropdownMenu } from '@wordpress/components';

import './style.css';

/**
 * DropDownMenu
 * wrapper for a WP DropdownMenu component that applies EE styles and defaults
 *
 * @constructor
 * @param {Object} eventDate  data representing an EE_Datetime object
 * @return {string}    menu
 */
const DropDownMenu = ( {
	menuItems,
	htmlClass,
	tooltipPosition = 'top left',
	index = 0,
	...otherProps
} ) => {
	const classes = classNames(
		htmlClass,
		`ee-drop-down-menu-${ index }`,
		'ee-drop-down-menu',
		'clickable',
	);
	return (
		<DropdownMenu
			tabIndex={ index }
			className={ classes }
			labelPosition={ tooltipPosition }
			controls={ menuItems }
			{ ...otherProps }
		/>
	);
};

DropDownMenu.propTypes = {
	menuItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
	htmlClass: PropTypes.string.isRequired,
	tooltip: PropTypes.string.isRequired,
	index: PropTypes.number,
	dashicon: PropTypes.string,
	tooltipPosition: PropTypes.string,
};

export default DropDownMenu;
