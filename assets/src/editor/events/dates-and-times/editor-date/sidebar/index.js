/**
 * External imports
 */
import { Component, Fragment } from 'react';
import { applyFilters } from '@wordpress/hooks';
import { DropDownMenu, IconMenuItem } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { editEventDate, copyEventDate, trashEventDate } from '../actions';
import { SidebarMenuItem } from './sidebar-menu-item';
import './style.css';

/**
 * EditorDateSidebar
 *
 * @constructor
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {string} rendered menu
 */
class EditorDateSidebar extends Component {
	/**
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {IconMenuItem}    Edit Event Date IconMenuItem
	 */
	mainDropDownMenu = ( eventDate ) => {
		return (
			<DropDownMenu
				tooltip={ __( 'event date main menu', 'event_espresso' ) }
				htmlClass={ `editor-date-${ eventDate.id }` }
				menuItems={ [
					{
						title: __( 'edit date', 'event_espresso' ),
						icon: 'edit',
						onClick: () => editEventDate( eventDate ),
					},
					{
						title: __( 'copy date', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyEventDate( eventDate ),
					},
					{
						title: __( 'trash date', 'event_espresso' ),
						icon: 'trash',
						onClick: () => trashEventDate( eventDate ),
					},
					{
						title: __( 'edit venue', 'event_espresso' ),
						icon: 'location',
						onClick: () => window.location(
							eventDate.edit_venue_link
						),
					},
				] }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {IconMenuItem}    Edit Event Date IconMenuItem
	 */
	editDateMenuItem = ( eventDate ) => {
		return (
			<IconMenuItem
				index={ 1 }
				tooltip={ __( 'edit event date', 'event_espresso' ) }
				id={ `edit-date-${ eventDate.id }` }
				htmlClass="edit-date"
				dashicon="edit"
				onClick={ () => editEventDate( eventDate ) }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    		JSON object defining the Event Date
	 * @param {Function} viewTicketsHandler callback for displaying ticket list
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	viewTicketsMenuItem = ( eventDate, viewTicketsHandler ) => {
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ __( 'assign tickets', 'event_espresso' ) }
				id={ `view-tickets-date-${ eventDate.id }` }
				htmlClass="view-tickets-date"
				dashicon="tickets-alt"
				onClick={ () => viewTicketsHandler( eventDate ) }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    	JSON object defining the Event Date
	 * @param {Array} sidebarMenuItems  Array of IconMenuItem objects
	 * @return {Array}    				Array of rendered IconMenuItem list items
	 */
	renderSidebarMenuItems = ( eventDate, sidebarMenuItems ) => {
		return sidebarMenuItems.map(
			function( sidebarMenuItem, index ) {
				// console.log(
				// 	'EditorDateSidebar.renderSidebarMenuItems()' +
				// 	' sidebarMenuItem',
				// 	sidebarMenuItem
				// );
				return sidebarMenuItem && sidebarMenuItem.type && (
					sidebarMenuItem.type === DropDownMenu ||
					sidebarMenuItem.type === SidebarMenuItem ||
					sidebarMenuItem.type === IconMenuItem
				) && (
					<Fragment key={ index }>
						{ sidebarMenuItem }
					</Fragment>
				);
			}
		);
	};

	render() {
		const { eventDate, viewTicketsHandler } = this.props;
		let sidebarMenuItems = [];
		sidebarMenuItems.push( this.mainDropDownMenu( eventDate ) );
		sidebarMenuItems.push( this.editDateMenuItem( eventDate ) );
		sidebarMenuItems.push(
			this.viewTicketsMenuItem( eventDate, viewTicketsHandler )
		);
		sidebarMenuItems = applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			eventDate
		);
		return (
			<div
				id={ `ee-editor-date-sidebar-menu-${ eventDate.id }` }
				className={ 'ee-editor-date-sidebar-menu' }
			>
				{ this.renderSidebarMenuItems( eventDate, sidebarMenuItems ) }
			</div>
		);
	}
}

export default EditorDateSidebar;
