/**
 * External imports
 */
import { Component } from 'react';
import PropTypes from 'prop-types'
import { IconButton } from '@wordpress/components';

/**
 * Internal imports
 */
import './style.css';

/**
 * IconMenuItem
 * @return {string} rendered IconMenuItem
 */
class IconMenuItem extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		htmlClass: PropTypes.string.isRequired,
		dashicon: PropTypes.string.isRequired,
		tooltip: PropTypes.string.isRequired,
		tooltipPosition: PropTypes.string,
		onClick: PropTypes.func.isRequired,
	};

	render() {
		const {
			index,
			id,
			tooltip,
			dashicon,
			onClick,
			...otherProps
		} = this.props;
		let { htmlClass, tooltipPosition } = this.props;
		delete otherProps.htmlClass;
		delete otherProps.tooltipPosition;
		htmlClass = `ee-icon-menu-item-${ htmlClass }`;
		htmlClass += ` ee-icon-menu-item-${ index }`;
		htmlClass += ' ee-icon-menu-item clickable';
		tooltipPosition = tooltipPosition ? tooltipPosition : 'top left';
		return <IconButton
			id={ `ee-icon-menu-item-${ id }` }
			className={ htmlClass }
			onClick={ ( event ) => onClick( event ) }
			onKeyPress={ ( event ) => onClick( event ) }
			tooltip={ tooltip }
			labelPosition={ tooltipPosition }
			icon={ dashicon }
			{ ...otherProps }
		/>;
	}
}

export default IconMenuItem;
