/**
 * External imports
 */
import { Component } from 'react';
import { Tooltip } from '@wordpress/components';

/**
 * SidebarMenuItem
 * @return {string} rendered SidebarMenuItem
 */
export class SidebarMenuItem extends Component {
	render() {
		const { index, id, htmlClass, href, title, dashicon, onClick } = this.props;

		// console.log( '' );
		// console.log( 'SidebarMenuItem props: ' );
		// console.log( { id, htmlClass, href, title, dashicon, callback } );
		let menuItem = (
			<span className={ `dashicons dashicons-${ dashicon } ee-menu-item-icon` }></span>
		);
		if ( href ) {
			menuItem = (
				<a href={ href } title={ title } target="_blank" rel="noopener noreferrer">
					{ menuItem }
					<span className="dashicons dashicons-external ee-menu-item-icon"></span>
				</a>
			);
		}
		return <Tooltip text={ title } position={ 'top center' } >
			<div
				id={ `ee-sidebar-menu-item-${ id }` }
				className={ `ee-sidebar-menu-item-${ htmlClass } ee-sidebar-menu-item-${ index } ee-sidebar-menu-item clickable` }
				onClick={ ( event ) => onClick( event ) }
				onKeyPress={ ( event ) => onClick( event ) }
				role="button"
				tabIndex={ index }
			>
				{ menuItem }
			</div>
		</Tooltip>;
	}
}
