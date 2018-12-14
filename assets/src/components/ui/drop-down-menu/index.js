/**
 * External imports
 */
import { Component } from 'react';
import PropTypes from 'prop-types'
import { __ } from '@eventespresso/i18n';
import { DropdownMenu } from '@wordpress/components';

/**
 * Internal imports
 */
// import './style.css';

/**
 * DropDownMenu
 *
 * @constructor
 * @param {Object} eventDate  data representing an EE_Datetime object
 * @return {string}    menu
 */
class DropDownMenu extends Component {
	static propTypes = {
		menuItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
		htmlClass: PropTypes.string.isRequired,
		tooltip: PropTypes.string.isRequired,
		index: PropTypes.number,
		dashicon: PropTypes.string,
		tooltipPosition: PropTypes.string,
	};

	render() {
		const {
			menuItems,
			index = 0,
			...otherProps
		} = this.props;
		let { htmlClass, tooltipPosition } = this.props;
		delete otherProps.htmlClass;
		delete otherProps.tooltipPosition;
		htmlClass = htmlClass ? `${ htmlClass } ` : '';
		htmlClass += `ee-drop-down-menu-${ index }`;
		htmlClass += ' ee-drop-down-menu clickable';
		tooltipPosition = tooltipPosition ? tooltipPosition : 'top left';
		return (
			<DropdownMenu
				tabIndex={ index }
				className={ htmlClass }
				labelPosition={ tooltipPosition }
				controls={ menuItems }
				{ ...otherProps }
			/>
		);
	}
}

export default DropDownMenu;
