/**
 * External imports
 */
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types'
import { DropdownMenu } from '@wordpress/components';

/**
 * DropDownMenu
 * wrapper for a WP DropdownMenu component that applies EE styles and defaults
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
			tooltipPosition = 'top left',
			index = 0,
			...otherProps
		} = this.props;
		let { htmlClass } = this.props;
		delete otherProps.htmlClass;
		htmlClass = htmlClass ? `${ htmlClass } ` : '';
		htmlClass += `ee-drop-down-menu-${ index }`;
		htmlClass += ' ee-drop-down-menu clickable';
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
