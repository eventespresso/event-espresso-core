/**
 * External imports
 */
import { Component } from 'react';
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
	render() {
		const { index, id, title, dashicon, onClick } = this.props;
		let { htmlClass, titlePosition } = this.props;
		htmlClass = `ee-entity-menu-item-${ htmlClass }`;
		htmlClass += ` ee-entity-menu-item-${ index }`;
		htmlClass += ' ee-entity-menu-item clickable';
		titlePosition = titlePosition ? titlePosition : 'top left';
		return <IconButton
			id={ `ee-entity-menu-item-${ id }` }
			className={ htmlClass }
			onClick={ ( event ) => onClick( event ) }
			onKeyPress={ ( event ) => onClick( event ) }
			tabIndex={ index }
			tooltip={ title }
			labelPosition={ titlePosition }
			icon={ dashicon }
		/>;
	}
}

export default IconMenuItem;
